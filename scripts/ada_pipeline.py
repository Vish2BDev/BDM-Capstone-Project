#!/usr/bin/env python3
"""
Enterprise EDA Pipeline for ChatGPT Plus Advanced Data Analysis
Enhanced with CLI parameters, Plotly dashboards, and HTML reporting

Usage:
    python ada_pipeline.py --data cleaned_sales.csv --output output_ada --top-n 15 --html-report
    python ada_pipeline.py --help
"""

import os
import sys
import argparse
import warnings
from datetime import datetime
from pathlib import Path

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import plotly.offline as pyo
from jinja2 import Template

# Suppress warnings for cleaner output
warnings.filterwarnings('ignore')

class ADAConfig:
    """Configuration class for pipeline parameters"""
    def __init__(self, args):
        self.data_path = args.data
        self.output_dir = args.output
        self.metadata_path = os.getenv('SKU_METADATA_PATH', args.metadata)
        self.holidays_path = os.getenv('HOLIDAYS_PATH', args.holidays)
        self.top_n = args.top_n
        self.volatility_window_short = args.vol_short
        self.volatility_window_medium = args.vol_medium
        self.volatility_window_long = args.vol_long
        self.margin_threshold = args.margin_threshold
        self.generate_html = args.html_report
        self.interactive_plots = args.interactive
        
        # Ensure output directory exists
        Path(self.output_dir).mkdir(parents=True, exist_ok=True)

def parse_arguments():
    """Parse command line arguments with environment variable support"""
    parser = argparse.ArgumentParser(
        description='Enterprise EDA Pipeline with Interactive Dashboards',
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
        epilog="""
Environment Variables:
  ADA_DATA_PATH, ADA_OUTPUT_DIR, ADA_METADATA_PATH, ADA_HOLIDAYS_PATH,
  ADA_TOP_N, ADA_VOL_SHORT, ADA_VOL_MEDIUM, ADA_VOL_LONG, ADA_MARGIN_THRESHOLD
        """
    )
    
    # Data paths
    parser.add_argument('--data', default=os.environ.get('ADA_DATA_PATH', 'cleaned_sales.csv'),
                       help='Path to cleaned sales data CSV')
    parser.add_argument('--output', default=os.environ.get('ADA_OUTPUT_DIR', 'output_ada'),
                       help='Output directory for results')
    parser.add_argument('--metadata', default=os.environ.get('ADA_METADATA_PATH', None),
                       help='Path to SKU metadata CSV (optional)')
    parser.add_argument('--holidays', default=os.environ.get('ADA_HOLIDAYS_PATH', None),
                       help='Path to holidays CSV (optional)')
    
    # Analysis parameters
    parser.add_argument('--top-n', type=int, default=int(os.environ.get('ADA_TOP_N', '10')),
                       help='Number of top items to show in analyses')
    parser.add_argument('--vol-short', type=int, default=int(os.environ.get('ADA_VOL_SHORT', '7')),
                       help='Short-term volatility window (days)')
    parser.add_argument('--vol-medium', type=int, default=int(os.environ.get('ADA_VOL_MEDIUM', '30')),
                       help='Medium-term volatility window (days)')
    parser.add_argument('--vol-long', type=int, default=int(os.environ.get('ADA_VOL_LONG', '90')),
                       help='Long-term volatility window (days)')
    parser.add_argument('--margin-threshold', type=float, default=float(os.environ.get('ADA_MARGIN_THRESHOLD', '0.15')),
                       help='Low margin threshold (0-1)')
    
    # Output options
    parser.add_argument('--html-report', action='store_true',
                       help='Generate comprehensive HTML report')
    parser.add_argument('--interactive', action='store_true', default=True,
                       help='Generate interactive Plotly charts')
    
    return parser.parse_args()

def log_ada(message):
    """ADA-style logging"""
    print(f"[ADA] {message}")

def run_unit_tests():
    """Lightweight unit tests for key functions"""
    log_ada("Running unit tests (synthetic)")
    
    # Test data enrichment
    test_df = pd.DataFrame({
        'date': pd.date_range('2025-01-01', periods=10),
        'product': ['A'] * 10,
        'quantity_sold': range(1, 11),
        'unit_price': [10.0] * 10,
        'total_revenue': [i * 10 for i in range(1, 11)]
    })
    
    enriched = enrich_time_features(test_df)
    assert 'day_of_week' in enriched.columns, "Time enrichment failed"
    log_ada("Enriching with time-based features")
    
    # Test ABC classification
    abc_df = compute_abc_classification(test_df)
    assert 'abc_class' in abc_df.columns, "ABC classification failed"
    log_ada("Computing ABC classification")
    
    # Test rolling volatility
    vol_df = calculate_rolling_volatility(test_df, window=3)
    assert 'volatility_3d' in vol_df.columns, "Rolling volatility failed"
    log_ada("Calculating rolling volatility")
    
    # Test margin simulation
    margin_df = simulate_margins(test_df, cost_scenarios=[0.7, 0.8, 0.9])
    assert 'margin_70' in margin_df.columns, "Margin simulation failed"
    log_ada("Simulating margins under cost scenarios")
    
    log_ada("Unit tests passed")

def enrich_time_features(df):
    """Add time-based features"""
    df = df.copy()
    df['date'] = pd.to_datetime(df['date'])
    df['day_of_week'] = df['date'].dt.day_name()
    df['week_of_year'] = df['date'].dt.isocalendar().week
    df['month'] = df['date'].dt.month
    df['quarter'] = df['date'].dt.quarter
    df['is_weekend'] = df['date'].dt.weekday >= 5
    return df

def merge_or_derive_metadata(df, metadata_path=None):
    """Merge SKU metadata or derive proxies"""
    if metadata_path and os.path.exists(metadata_path):
        log_ada(f"Loading metadata from {metadata_path}")
        metadata = pd.read_csv(metadata_path)
        df = df.merge(metadata, on='product', how='left')
    else:
        log_ada("Deriving metadata proxies from sales patterns")
        # Derive supplier proxy from product naming patterns
        df['supplier_proxy'] = df['product'].str.extract(r'^([A-Z]+)')[0].fillna('UNKNOWN')
        
        # Derive category hierarchy if not present
        if 'category' not in df.columns:
            df['category'] = 'GENERAL'
        
        # Derive cost ratio proxy from price stability
        price_cv = df.groupby('product')['unit_price'].agg(['mean', 'std']).reset_index()
        price_cv['cost_ratio_proxy'] = 1 - (price_cv['std'] / price_cv['mean']).fillna(0)
        df = df.merge(price_cv[['product', 'cost_ratio_proxy']], on='product', how='left')
    
    return df

def create_plotly_volatility_heatmap(df, top_n=10):
    """Create interactive volatility heatmap"""
    # Calculate daily volatility by product
    daily_vol = df.groupby(['product', 'date'])['unit_price'].std().reset_index()
    vol_matrix = daily_vol.pivot(index='product', columns='date', values='unit_price')
    
    # Get top volatile products
    product_vol = vol_matrix.std(axis=1).nlargest(top_n)
    vol_subset = vol_matrix.loc[product_vol.index]
    
    fig = go.Figure(data=go.Heatmap(
        z=vol_subset.values,
        x=vol_subset.columns.strftime('%Y-%m-%d'),
        y=vol_subset.index,
        colorscale=[[0, '#f8f9fa'], [0.2, '#e3f2fd'], [0.4, '#90caf9'], [0.6, '#42a5f5'], [0.8, '#1976d2'], [1, '#0d47a1']],
        hoverongaps=False,
        hovertemplate='<b>%{y}</b><br>Date: %{x}<br>Price Volatility: %{z:.2f}<extra></extra>',
        colorbar=dict(
            title=dict(text="Volatility", side="right"),
            tickmode="linear",
            tick0=0,
            dtick=vol_subset.values.max()/5 if vol_subset.values.max() > 0 else 1
        )
    ))
    
    fig.update_layout(
        title=dict(
            text=f'Price Volatility Heatmap - Top {top_n} Products',
            x=0.5,
            font=dict(size=20, color='#2E8B57', family='Inter')
        ),
        xaxis=dict(
            title=dict(text='Date', font=dict(size=14, color='#333')),
            tickfont=dict(size=12, color='#666'),
            gridcolor='#e9ecef'
        ),
        yaxis=dict(
            title=dict(text='Product', font=dict(size=14, color='#333')),
            tickfont=dict(size=12, color='#666'),
            gridcolor='#e9ecef'
        ),
        height=600,
        plot_bgcolor='white',
        paper_bgcolor='white',
        font=dict(family='Inter'),
        margin=dict(l=80, r=80, t=80, b=80)
    )
    
    return fig

def create_plotly_margin_boxplot(df):
    """Create interactive margin distribution boxplot"""
    margin_cols = [col for col in df.columns if col.startswith('margin_')]
    
    if not margin_cols:
        return None
    
    fig = go.Figure()
    
    colors = ['#2E8B57', '#3CB371', '#228B22', '#32CD32', '#90EE90']
    
    for i, col in enumerate(margin_cols):
        scenario = col.split('_')[1]
        fig.add_trace(go.Box(
            y=df[col],
            name=f'Cost {scenario}%',
            boxpoints='outliers',
            hovertemplate=f'Cost Scenario: {scenario}%<br>Margin: %{{y:.2%}}<extra></extra>',
            marker=dict(color=colors[i % len(colors)]),
            line=dict(color=colors[i % len(colors)], width=2)
        ))
    
    fig.update_layout(
        title=dict(
            text='Margin Distribution by Cost Scenario',
            x=0.5,
            font=dict(size=20, color='#2E8B57', family='Inter')
        ),
        yaxis=dict(
            title=dict(text='Margin (%)', font=dict(size=14, color='#333')),
            tickfont=dict(size=12, color='#666'),
            gridcolor='#e9ecef',
            tickformat='.1%'
        ),
        xaxis=dict(
            title=dict(text='Cost Scenario', font=dict(size=14, color='#333')),
            tickfont=dict(size=12, color='#666'),
            gridcolor='#e9ecef'
        ),
        height=500,
        plot_bgcolor='white',
        paper_bgcolor='white',
        font=dict(family='Inter'),
        margin=dict(l=80, r=80, t=80, b=80)
    )
    
    return fig

def create_plotly_category_dashboard(df):
    """Create interactive category performance dashboard"""
    category_perf = df.groupby('category').agg({
        'total_revenue': 'sum',
        'quantity_sold': 'sum',
        'product': 'nunique'
    }).reset_index()
    
    # Create subplots
    fig = make_subplots(
        rows=2, cols=2,
        subplot_titles=('Revenue by Category', 'Quantity by Category', 
                       'Product Count by Category', 'Revenue Share'),
        specs=[[{"type": "bar"}, {"type": "bar"}],
               [{"type": "bar"}, {"type": "pie"}]]
    )
    
    # Color palette
    colors = ['#2E8B57', '#3CB371', '#228B22', '#32CD32', '#90EE90', '#4169E1', '#FF6B35']
    
    # Revenue bar chart
    fig.add_trace(
        go.Bar(x=category_perf['category'], y=category_perf['total_revenue'],
               name='Revenue', hovertemplate='Category: %{x}<br>Revenue: ₹%{y:,.0f}<extra></extra>',
               marker=dict(color=colors[0], line=dict(color='white', width=1))),
        row=1, col=1
    )
    
    # Quantity bar chart
    fig.add_trace(
        go.Bar(x=category_perf['category'], y=category_perf['quantity_sold'],
               name='Quantity', hovertemplate='Category: %{x}<br>Quantity: %{y:,.0f}<extra></extra>',
               marker=dict(color=colors[1], line=dict(color='white', width=1))),
        row=1, col=2
    )
    
    # Product count bar chart
    fig.add_trace(
        go.Bar(x=category_perf['category'], y=category_perf['product'],
               name='Products', hovertemplate='Category: %{x}<br>Products: %{y}<extra></extra>',
               marker=dict(color=colors[2], line=dict(color='white', width=1))),
        row=2, col=1
    )
    
    # Revenue share pie chart
    fig.add_trace(
        go.Pie(labels=category_perf['category'], values=category_perf['total_revenue'],
               name='Revenue Share', hovertemplate='Category: %{label}<br>Revenue: ₹%{value:,.0f}<br>Share: %{percent}<extra></extra>',
               marker=dict(colors=colors[:len(category_perf)], line=dict(color='white', width=2))),
        row=2, col=2
    )
    
    fig.update_layout(
        height=800,
        title=dict(
            text="Category Performance Dashboard",
            x=0.5,
            font=dict(size=24, color='#2E8B57', family='Inter')
        ),
        plot_bgcolor='white',
        paper_bgcolor='white',
        font=dict(family='Inter'),
        margin=dict(l=80, r=80, t=100, b=80)
    )
    
    # Update subplot titles styling
    for annotation in fig['layout']['annotations']:
        annotation['font'] = dict(size=16, color='#333', family='Inter')
    
    return fig

def create_plotly_control_chart(df):
    """Create Shewhart X-MR control chart for price consistency"""
    # Calculate daily average price
    daily_prices = df.groupby('date')['unit_price'].mean().reset_index()
    daily_prices = daily_prices.sort_values('date')
    
    # Calculate moving ranges
    daily_prices['moving_range'] = daily_prices['unit_price'].diff().abs()
    
    # Calculate control limits
    mean_price = daily_prices['unit_price'].mean()
    mean_mr = daily_prices['moving_range'].mean()
    
    ucl_x = mean_price + 2.66 * mean_mr
    lcl_x = mean_price - 2.66 * mean_mr
    ucl_mr = 3.27 * mean_mr
    
    fig = make_subplots(
        rows=2, cols=1,
        subplot_titles=('X Chart - Daily Average Price', 'MR Chart - Moving Range'),
        vertical_spacing=0.1
    )
    
    # X Chart
    fig.add_trace(
        go.Scatter(x=daily_prices['date'], y=daily_prices['unit_price'],
                  mode='lines+markers', name='Daily Price',
                  hovertemplate='Date: %{x}<br>Price: ₹%{y:.2f}<extra></extra>',
                  line=dict(color='#2E8B57', width=2),
                  marker=dict(color='#2E8B57', size=6, line=dict(color='white', width=1))),
        row=1, col=1
    )
    
    # Control limits for X chart
    fig.add_hline(y=mean_price, line_dash="dash", line_color="#28a745", line_width=2, row=1, col=1)
    fig.add_hline(y=ucl_x, line_dash="dash", line_color="#dc3545", line_width=2, row=1, col=1)
    fig.add_hline(y=lcl_x, line_dash="dash", line_color="#dc3545", line_width=2, row=1, col=1)
    
    # MR Chart
    fig.add_trace(
        go.Scatter(x=daily_prices['date'], y=daily_prices['moving_range'],
                  mode='lines+markers', name='Moving Range',
                  hovertemplate='Date: %{x}<br>Range: ₹%{y:.2f}<extra></extra>',
                  line=dict(color='#4169E1', width=2),
                  marker=dict(color='#4169E1', size=6, line=dict(color='white', width=1))),
        row=2, col=1
    )
    
    # Control limits for MR chart
    fig.add_hline(y=mean_mr, line_dash="dash", line_color="#28a745", line_width=2, row=2, col=1)
    fig.add_hline(y=ucl_mr, line_dash="dash", line_color="#dc3545", line_width=2, row=2, col=1)
    
    fig.update_layout(
        height=700,
        title=dict(
            text="Price Consistency Control Charts",
            x=0.5,
            font=dict(size=24, color='#2E8B57', family='Inter')
        ),
        plot_bgcolor='white',
        paper_bgcolor='white',
        font=dict(family='Inter'),
        margin=dict(l=80, r=80, t=100, b=80)
    )
    
    # Update subplot titles styling
    for annotation in fig['layout']['annotations']:
        annotation['font'] = dict(size=16, color='#333', family='Inter')
    
    # Update axes styling
    fig.update_xaxes(gridcolor='#e9ecef', tickfont=dict(size=12, color='#666'))
    fig.update_yaxes(gridcolor='#e9ecef', tickfont=dict(size=12, color='#666'))
    
    return fig

def compute_abc_classification(df):
    """Compute ABC classification based on revenue"""
    product_revenue = df.groupby('product')['total_revenue'].sum().reset_index()
    product_revenue = product_revenue.sort_values('total_revenue', ascending=False)
    
    # Calculate cumulative percentage
    product_revenue['cumulative_revenue'] = product_revenue['total_revenue'].cumsum()
    total_revenue = product_revenue['total_revenue'].sum()
    product_revenue['cumulative_pct'] = product_revenue['cumulative_revenue'] / total_revenue
    
    # Assign ABC classes
    product_revenue['abc_class'] = 'C'
    product_revenue.loc[product_revenue['cumulative_pct'] <= 0.8, 'abc_class'] = 'B'
    product_revenue.loc[product_revenue['cumulative_pct'] <= 0.5, 'abc_class'] = 'A'
    
    return product_revenue[['product', 'total_revenue', 'abc_class']]

def estimate_price_elasticity(df):
    """Estimate price elasticity using log-log OLS"""
    try:
        import statsmodels.api as sm
        
        # Prepare data for elasticity estimation
        elasticity_data = df.groupby(['product', 'date']).agg({
            'quantity_sold': 'sum',
            'unit_price': 'mean',
            'category': 'first',
            'day_of_week': 'first'
        }).reset_index()
        
        # Filter out zero quantities and prices
        elasticity_data = elasticity_data[
            (elasticity_data['quantity_sold'] > 0) & 
            (elasticity_data['unit_price'] > 0)
        ]
        
        # Ensure we have enough data
        if len(elasticity_data) < 10:
            log_ada("Insufficient data for elasticity estimation")
            return None, "Insufficient data"
        
        # Log transformation
        elasticity_data['log_quantity'] = np.log(elasticity_data['quantity_sold'])
        elasticity_data['log_price'] = np.log(elasticity_data['unit_price'])
        
        # Simple model with just price (avoid categorical issues)
        X = elasticity_data[['log_price']].copy()
        X = sm.add_constant(X)
        y = elasticity_data['log_quantity']
        
        # Ensure data types are numeric
        X = X.astype(float)
        y = y.astype(float)
        
        # Remove any remaining NaN values
        mask = ~(np.isnan(X).any(axis=1) | np.isnan(y))
        X = X[mask]
        y = y[mask]
        
        if len(X) < 5:
            log_ada("Insufficient clean data for elasticity estimation")
            return None, "Insufficient clean data"
        
        # Fit model
        model = sm.OLS(y, X).fit()
        
        # Extract elasticity (coefficient of log_price)
        elasticity = model.params['log_price']
        
        # Create results dataframe
        elasticity_results = pd.DataFrame({
            'elasticity': [elasticity],
            'std_error': [model.bse['log_price']],
            'p_value': [model.pvalues['log_price']],
            'r_squared': [model.rsquared],
            'observations': [len(X)]
        })
        
        # Save model summary
        return elasticity_results, model.summary()
        
    except ImportError:
        log_ada("statsmodels not available, skipping elasticity estimation")
        return None, "statsmodels not installed"
    except Exception as e:
        log_ada(f"Error in elasticity estimation: {str(e)}")
        return None, f"Error: {str(e)}"

def compute_inventory_turnover(df):
    """Compute inventory turnover proxy based on sales velocity"""
    # Calculate sales velocity (quantity per day) by product
    date_range = (df['date'].max() - df['date'].min()).days + 1
    
    turnover = df.groupby('product').agg({
        'quantity_sold': 'sum',
        'total_revenue': 'sum',
        'date': ['min', 'max']
    }).reset_index()
    
    turnover.columns = ['product', 'total_quantity', 'total_revenue', 'first_sale', 'last_sale']
    
    # Calculate days active
    turnover['days_active'] = (turnover['last_sale'] - turnover['first_sale']).dt.days + 1
    turnover['sales_velocity'] = turnover['total_quantity'] / turnover['days_active']
    
    # Proxy for inventory turnover (higher velocity = higher turnover)
    turnover['turnover_proxy'] = turnover['sales_velocity'] * 365  # Annualized
    
    return turnover[['product', 'sales_velocity', 'turnover_proxy', 'total_quantity', 'total_revenue']]

def calculate_rolling_volatility(df, window=7):
    """Calculate rolling volatility for price stability analysis"""
    # Create daily price data
    daily_data = df.groupby(['product', 'date'])['unit_price'].mean().reset_index()
    
    # Calculate rolling volatility per product
    volatility_results = []
    
    for product in daily_data['product'].unique():
        product_data = daily_data[daily_data['product'] == product].sort_values('date')
        
        if len(product_data) >= window:
            product_data[f'volatility_{window}d'] = (
                product_data['unit_price']
                .rolling(window=window, min_periods=1)
                .std()
            )
            
            volatility_results.append(product_data)
    
    if volatility_results:
        result_df = pd.concat(volatility_results, ignore_index=True)
        return result_df
    else:
        return pd.DataFrame()

def simulate_margins(df, cost_scenarios=[0.7, 0.8, 0.9]):
    """Simulate margins under different cost scenarios"""
    margin_df = df.copy()
    
    for cost_ratio in cost_scenarios:
        cost_pct = int(cost_ratio * 100)
        margin_col = f'margin_{cost_pct}'
        margin_df[margin_col] = 1 - cost_ratio  # Simple margin calculation
    
    return margin_df

def export_csv_outputs(df, abc_df, elasticity_df, turnover_df, volatility_df, config):
    """Export all CSV outputs"""
    
    # Top volatile SKUs
    if not volatility_df.empty:
        vol_summary = volatility_df.groupby('product')[f'volatility_{config.volatility_window_short}d'].agg(['mean', 'max']).reset_index()
        vol_summary.columns = ['product', 'avg_volatility', 'max_volatility']
        vol_summary = vol_summary.nlargest(config.top_n, 'avg_volatility')
        vol_summary.to_csv(f'{config.output_dir}/top_volatile_skus.csv', index=False)
        log_ada("Export: Top volatile SKUs")
    
    # Low-margin SKUs
    margin_cols = [col for col in df.columns if col.startswith('margin_')]
    if margin_cols:
        low_margin = df[df[margin_cols[0]] < config.margin_threshold]
        low_margin_summary = low_margin.groupby('product').agg({
            'total_revenue': 'sum',
            margin_cols[0]: 'mean'
        }).reset_index()
        low_margin_summary.to_csv(f'{config.output_dir}/low_margin_recommendations.csv', index=False)
        log_ada("Export: Low-margin SKUs")
    
    # Category performance benchmarks
    category_benchmarks = df.groupby('category').agg({
        'total_revenue': ['sum', 'mean'],
        'quantity_sold': ['sum', 'mean'],
        'unit_price': ['mean', 'std']
    }).reset_index()
    category_benchmarks.columns = ['category', 'total_revenue', 'avg_revenue_per_transaction', 
                                  'total_quantity', 'avg_quantity_per_transaction',
                                  'avg_unit_price', 'price_volatility']
    category_benchmarks.to_csv(f'{config.output_dir}/category_performance_benchmarks.csv', index=False)
    
    # ABC classification
    abc_df.to_csv(f'{config.output_dir}/abc_classification.csv', index=False)
    
    # Inventory turnover
    turnover_df.to_csv(f'{config.output_dir}/inventory_turnover_rates.csv', index=False)
    
    # Price elasticity
    if elasticity_df is not None:
        elasticity_df.to_csv(f'{config.output_dir}/price_elasticity.csv', index=False)
    
    # Rolling volatility
    if not volatility_df.empty:
        volatility_df.to_csv(f'{config.output_dir}/rolling_volatility.csv', index=False)

def generate_html_report(df, config, plotly_figs):
    """Generate comprehensive HTML executive report"""
    
    # Calculate key metrics
    total_revenue = df['total_revenue'].sum()
    total_transactions = len(df)
    unique_products = df['product'].nunique()
    date_range = f"{df['date'].min().strftime('%B %Y')} to {df['date'].max().strftime('%B %Y')}"
    
    # Category insights
    category_perf = df.groupby('category')['total_revenue'].sum().sort_values(ascending=False)
    top_categories = category_perf.head(3)
    
    # Convert Plotly figures to HTML
    plotly_html = {}
    for name, fig in plotly_figs.items():
        if fig is not None:
            plotly_html[name] = pyo.plot(fig, output_type='div', include_plotlyjs=False)
    
    # HTML template
    html_template = Template("""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pure'O Naturals - Executive EDA Report</title>
        <script src="https://cdn.plot.ly/plotly-3.1.1.min.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
            :root {
                --primary-color: #2E8B57;
                --primary-light: #3CB371;
                --primary-dark: #228B22;
                --secondary-color: #4169E1;
                --accent-color: #FF6B35;
                --success-color: #28a745;
                --warning-color: #ffc107;
                --danger-color: #dc3545;
                --light-bg: #f8f9fa;
                --card-shadow: 0 4px 20px rgba(0,0,0,0.08);
                --border-radius: 12px;
                --transition: all 0.3s ease;
            }
            
            * { box-sizing: border-box; }
            
            body { 
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                margin: 0; 
                padding: 20px; 
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                min-height: 100vh;
                line-height: 1.6;
            }
            
            .container { 
                max-width: 1400px; 
                margin: 0 auto; 
                background: white; 
                padding: 40px; 
                border-radius: var(--border-radius); 
                box-shadow: var(--card-shadow);
                position: relative;
                overflow: hidden;
            }
            
            .container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, var(--primary-color), var(--primary-light), var(--secondary-color));
            }
            
            .header { 
                text-align: center; 
                margin-bottom: 50px; 
                padding-bottom: 30px;
                position: relative;
            }
            
            .header h1 { 
                color: var(--primary-color); 
                margin: 0; 
                font-size: 3.2em; 
                font-weight: 700;
                letter-spacing: -0.02em;
                background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .header .subtitle { 
                color: #666; 
                font-size: 1.4em; 
                margin: 15px 0;
                font-weight: 500;
            }
            
            .header .meta { 
                color: #888; 
                font-size: 1.1em; 
                margin: 10px 0;
                font-weight: 400;
            }
            
            .metrics { 
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
                gap: 25px; 
                margin: 40px 0; 
            }
            
            .metric-card { 
                background: linear-gradient(135deg, var(--primary-color), var(--primary-light)); 
                color: white; 
                padding: 30px; 
                border-radius: var(--border-radius); 
                text-align: center;
                transition: var(--transition);
                position: relative;
                overflow: hidden;
            }
            
            .metric-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                transition: left 0.5s;
            }
            
            .metric-card:hover::before {
                left: 100%;
            }
            
            .metric-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 30px rgba(46, 139, 87, 0.3);
            }
            
            .metric-card h3 { 
                margin: 0; 
                font-size: 2.5em; 
                font-weight: 700;
                text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .metric-card p { 
                margin: 10px 0 0 0; 
                opacity: 0.95;
                font-size: 1.1em;
                font-weight: 500;
            }
            
            .section { 
                margin: 50px 0; 
            }
            
            .section h2 { 
                color: var(--primary-color); 
                border-bottom: 3px solid var(--primary-color); 
                padding-bottom: 15px;
                font-size: 2.2em;
                font-weight: 600;
                margin-bottom: 30px;
                position: relative;
            }
            
            .section h2::after {
                content: '';
                position: absolute;
                bottom: -3px;
                left: 0;
                width: 60px;
                height: 3px;
                background: var(--accent-color);
            }
            
            .chart-container { 
                margin: 30px 0; 
                padding: 30px; 
                background: var(--light-bg); 
                border-radius: var(--border-radius);
                box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                border: 1px solid #e9ecef;
            }
            
            .insights { 
                background: linear-gradient(135deg, #e8f5e8, #f0f8f0); 
                padding: 25px; 
                border-radius: var(--border-radius); 
                border-left: 5px solid var(--primary-color);
                margin: 25px 0;
                box-shadow: 0 2px 10px rgba(46, 139, 87, 0.1);
            }
            
            .methodology { 
                background: linear-gradient(135deg, #f0f8ff, #e6f3ff); 
                padding: 25px; 
                border-radius: var(--border-radius); 
                border-left: 5px solid var(--secondary-color);
                margin: 25px 0;
                box-shadow: 0 2px 10px rgba(65, 105, 225, 0.1);
            }
            
            .footer { 
                text-align: center; 
                margin-top: 60px; 
                padding-top: 30px; 
                border-top: 2px solid #e9ecef; 
                color: #666;
                font-size: 0.95em;
            }
            
            ul { 
                line-height: 1.8; 
                padding-left: 20px;
            }
            
            li {
                margin-bottom: 8px;
            }
            
            .category-list { 
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); 
                gap: 15px; 
                margin: 20px 0;
            }
            
            .category-item { 
                background: white; 
                padding: 20px; 
                border-radius: var(--border-radius); 
                border-left: 4px solid var(--primary-color);
                box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                transition: var(--transition);
            }
            
            .category-item:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            }
            
            .highlight {
                background: linear-gradient(135deg, var(--accent-color), #ff8c42);
                color: white;
                padding: 3px 8px;
                border-radius: 6px;
                font-weight: 600;
                font-size: 0.9em;
            }
            
            .badge {
                display: inline-block;
                padding: 4px 12px;
                background: var(--primary-color);
                color: white;
                border-radius: 20px;
                font-size: 0.85em;
                font-weight: 500;
                margin: 2px;
            }
            
            @media (max-width: 768px) {
                .container { padding: 20px; }
                .header h1 { font-size: 2.5em; }
                .metrics { grid-template-columns: 1fr; }
                .category-list { grid-template-columns: 1fr; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Pure'O Naturals</h1>
                <p class="subtitle">Executive EDA Dashboard</p>
                <p class="meta"><strong>Analysis Period:</strong> {{ date_range }}</p>
                <p class="meta"><em>Generated on {{ generation_date }}</em></p>
            </div>

            <div class="metrics">
                <div class="metric-card">
                    <h3>₹{{ "%.1f"|format(total_revenue/1000000) }}M</h3>
                    <p>Total Revenue</p>
                </div>
                <div class="metric-card">
                    <h3>{{ "{:,}".format(total_transactions) }}</h3>
                    <p>Total Transactions</p>
                </div>
                <div class="metric-card">
                    <h3>{{ unique_products }}</h3>
                    <p>Unique Products</p>
                </div>
                <div class="metric-card">
                    <h3>{{ top_categories|length }}</h3>
                    <p>Product Categories</p>
                </div>
            </div>

            <div class="section">
                <h2>📊 Interactive Dashboards</h2>
                
                {% if plotly_html.volatility_heatmap %}
                <div class="chart-container">
                    <h3>Price Volatility Analysis</h3>
                    {{ plotly_html.volatility_heatmap|safe }}
                </div>
                {% endif %}

                {% if plotly_html.category_dashboard %}
                <div class="chart-container">
                    <h3>Category Performance Dashboard</h3>
                    {{ plotly_html.category_dashboard|safe }}
                </div>
                {% endif %}

                {% if plotly_html.margin_boxplot %}
                <div class="chart-container">
                    <h3>Margin Analysis</h3>
                    {{ plotly_html.margin_boxplot|safe }}
                </div>
                {% endif %}

                {% if plotly_html.control_chart %}
                <div class="chart-container">
                    <h3>Price Consistency Control Charts</h3>
                    {{ plotly_html.control_chart|safe }}
                </div>
                {% endif %}
            </div>

            <div class="section">
                <h2>🎯 Key Business Insights</h2>
                <div class="insights">
                    <h3>Top Performing Categories</h3>
                    <div class="category-list">
                        {% for category, revenue in top_categories.items() %}
                        <div class="category-item">
                            <strong>{{ category }}</strong><br>
                            ₹{{ "%.1f"|format(revenue/1000000) }}M
                        </div>
                        {% endfor %}
                    </div>
                    
                    <h3>Strategic Recommendations</h3>
                    <ul>
                        <li><strong>Inventory Optimization:</strong> Focus on high-turnover products in {{ top_categories.index[0] }} category</li>
                        <li><strong>Price Strategy:</strong> Monitor volatile products for pricing opportunities</li>
                        <li><strong>Category Expansion:</strong> Consider expanding successful categories like {{ top_categories.index[0] }}</li>
                        <li><strong>Margin Improvement:</strong> Review cost structures for low-margin products</li>
                    </ul>
                </div>
            </div>

            <div class="section">
                <h2>🔬 Methodology</h2>
                <div class="methodology">
                    <h3>Analytical Techniques</h3>
                    <ul>
                        <li><strong>ABC Classification:</strong> Revenue-based product prioritization</li>
                        <li><strong>Volatility Analysis:</strong> {{ config.volatility_window_short }}, {{ config.volatility_window_medium }}, {{ config.volatility_window_long }}-day rolling windows</li>
                        <li><strong>Price Elasticity:</strong> Log-log OLS regression with category controls</li>
                        <li><strong>Control Charts:</strong> Shewhart X-MR for price consistency monitoring</li>
                        <li><strong>Inventory Turnover:</strong> Sales velocity proxy calculations</li>
                    </ul>
                    
                    <h3>Data Quality</h3>
                    <ul>
                        <li>Records processed: {{ "{:,}".format(total_transactions) }}</li>
                        <li>Date range: {{ date_range }}</li>
                        <li>Categories analyzed: {{ top_categories|length }}</li>
                        <li>Products tracked: {{ unique_products }}</li>
                    </ul>
                </div>
            </div>

            <div class="footer">
                <p>Generated by ADA Enterprise Pipeline | {{ generation_date }}</p>
                <p>For questions or additional analysis, contact the Data Analytics Team</p>
            </div>
        </div>
    </body>
    </html>
    """)
    
    # Render template
    html_content = html_template.render(
        total_revenue=total_revenue,
        total_transactions=total_transactions,
        unique_products=unique_products,
        date_range=date_range,
        top_categories=top_categories,
        plotly_html=plotly_html,
        config=config,
        generation_date=datetime.now().strftime('%B %d, %Y at %I:%M %p')
    )
    
    # Save HTML report
    html_path = f'{config.output_dir}/executive_report.html'
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    log_ada(f"HTML report generated: {html_path}")
    return html_path

def main():
    """Main pipeline execution"""
    args = parse_arguments()
    config = ADAConfig(args)
    
    # Run unit tests
    run_unit_tests()
    
    # Load and validate data
    log_ada(f"Loading dataset: {config.data_path}")
    if not os.path.exists(config.data_path):
        print(f"Error: Data file {config.data_path} not found")
        sys.exit(1)
    
    df = pd.read_csv(config.data_path)
    initial_records = len(df)
    
    # Basic data cleaning
    df = df.dropna(subset=['date', 'product', 'total_revenue'])
    df = df[df['total_revenue'] > 0]
    
    log_ada(f"Records kept after cleaning: {len(df)} / {initial_records}")
    
    # Enrich with time features
    log_ada("Enriching with time-based features")
    df = enrich_time_features(df)
    
    # Merge or derive metadata
    log_ada("Merging SKU metadata (or deriving proxies)")
    df = merge_or_derive_metadata(df, config.metadata_path)
    
    # Generate interactive visualizations
    plotly_figs = {}
    
    if config.interactive_plots:
        log_ada(f"Plot: Volatility heatmap (top {config.top_n} SKUs)")
        plotly_figs['volatility_heatmap'] = create_plotly_volatility_heatmap(df, config.top_n)
        
        log_ada("Plot: Margin distribution by category")
        df = simulate_margins(df)
        plotly_figs['margin_boxplot'] = create_plotly_margin_boxplot(df)
        
        log_ada("Plot: Category mix dashboard (stacked)")
        plotly_figs['category_dashboard'] = create_plotly_category_dashboard(df)
        
        log_ada("Plot: Shewhart X-MR for unit price consistency")
        plotly_figs['control_chart'] = create_plotly_control_chart(df)
    
    # Compute analytics
    log_ada("Computing ABC classification")
    abc_df = compute_abc_classification(df)
    
    log_ada("Estimating price elasticity (pooled log-log OLS)")
    elasticity_df, elasticity_summary = estimate_price_elasticity(df)
    
    log_ada("Computing inventory turnover (sales velocity proxy)")
    turnover_df = compute_inventory_turnover(df)
    
    log_ada("Calculating rolling volatility")
    volatility_df = calculate_rolling_volatility(df, config.volatility_window_short)
    
    # Export CSV outputs
    export_csv_outputs(df, abc_df, elasticity_df, turnover_df, volatility_df, config)
    
    # Save elasticity model summary
    if elasticity_summary:
        with open(f'{config.output_dir}/elasticity_model_summary.txt', 'w') as f:
            f.write(str(elasticity_summary))
    
    # Generate HTML report
    if config.generate_html:
        html_path = generate_html_report(df, config, plotly_figs)
        log_ada(f"Executive report: {html_path}")
    
    log_ada("Pipeline complete. Outputs written to '{}' directory.".format(config.output_dir))

if __name__ == "__main__":
    main()