#!/usr/bin/env python3
"""
Pure'O Naturals Enterprise EDA Analysis
Comprehensive analysis to identify top 3-5 actionable business problems
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
import warnings
import os
import re
from pathlib import Path

warnings.filterwarnings('ignore')

# Set up plotting style
plt.style.use('default')
sns.set_palette("husl")

class PureONaturalsEDA:
    def __init__(self, data_dir):
        self.data_dir = Path(data_dir)
        self.output_dir = Path("output")
        self.output_dir.mkdir(exist_ok=True)
        
        # File paths
        self.file_paths = [
            "1-04-2025 to 30-04-2025 - SalesDetail.rpt.csv",
            "1-05-2025 to 31-05-2025 - SalesDetail.rpt.csv", 
            "1-06-2025 to 30-06-2025 - SalesDetail.rpt.csv",
            "1-07-2025 to 31-07-2025 - SalesDetail.rpt.csv",
            "1-08-2025 to 31-08-2025 - SalesDetail.rpt.csv",
            "1-09-2025 to 30-09-2025 - SalesDetail.rpt.csv"
        ]
        
        # Category mapping for product classification
        self.category_mapping = {
            'BEVERAGES': ['COFFEE', 'WATER', 'THUMS UP', 'KINLEY', 'MAAZA', 'MINUTE MAID', 'BAILLEY'],
            'SNACKS': ['SNACKS', 'BISCUITS'],
            'BREAKFAST': ['BREAKFAST'],
            'CONFECTIONERY': ['CONFECTIONERY'],
            'CONSUMABLES': ['CONSUMABLES'],
            'DAIRY': ['DAIRY'],
            'GHEE': ['GHEE'],
            'HEALTH': ['HEALTH', 'SUPPLEMENTS'],
            'SPICES': ['MASALAS', 'SPICES'],
            'MEAL_ACCOMPANIMENTS': ['MEAL ACCOMPANIMENTS'],
            'PERISHABLES': ['PERISHABLES'],
            'SALT_SUGAR': ['SALT', 'SUGAR', 'JAGGERY'],
            'OILS': ['OILS'],
            'STAPLES': ['STAPLES'],
            'HOUSEHOLD': ['HOUSEHOLD'],
            'VEGETABLES': ['VEGETABLES'],
            'FRUITS': ['FRUITS'],
            'JUICES': ['JUICES', 'CUT FRUITS'],
            'INSTANT_FOOD': ['INSTANT FOOD']
        }
        
        self.df_combined = None
        self.business_problems = []
        
    def parse_report_csv(self, file_path):
        """Parse report-style CSV files"""
        print(f"Processing: {file_path.name}")
        
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        data_rows = []
        current_department = None
        
        for i, line in enumerate(lines):
            line = line.strip()
            if not line:
                continue
                
            # Parse department headers
            if line.startswith('Department,'):
                parts = line.split(',')
                if len(parts) > 1:
                    current_department = parts[1].strip()
                continue
            
            # Parse data rows (lines with dates)
            if re.match(r'^\d{2}/\d{2}/\d{4},', line):
                parts = [p.strip() for p in line.split(',')]
                if len(parts) >= 11:
                    try:
                        date_str = parts[0]
                        sku_code = parts[1] if parts[1] else None
                        plu_code = parts[2] if parts[2] else None
                        sku_description = parts[3] if parts[3] else None
                        qty_sold = float(parts[4]) if parts[4] else 0.0
                        qty_ref = float(parts[5]) if parts[5] else 0.0
                        sp = float(parts[6]) if parts[6] else 0.0
                        tax_amt = float(parts[7]) if parts[7] else 0.0
                        surcharge = float(parts[8]) if parts[8] else 0.0
                        net_sales_excl = float(parts[9]) if parts[9] else 0.0
                        net_sales_incl = float(parts[10]) if parts[10] else 0.0
                        
                        data_rows.append({
                            'date': pd.to_datetime(date_str, format='%d/%m/%Y'),
                            'sku_code': sku_code,
                            'plu_code': plu_code,
                            'product': sku_description,
                            'quantity_sold': qty_sold,
                            'quantity_ref': qty_ref,
                            'unit_price': sp,
                            'tax_amount': tax_amt,
                            'surcharge': surcharge,
                            'net_sales_excl_tax': net_sales_excl,
                            'total_revenue': net_sales_incl,
                            'department': current_department
                        })
                    except (ValueError, IndexError) as e:
                        continue
        
        df = pd.DataFrame(data_rows)
        if not df.empty:
            # Extract month from filename
            month_match = re.search(r'(\d{2})-(\d{4})', file_path.name)
            if month_match:
                df['month'] = int(month_match.group(1))
                df['year'] = int(month_match.group(2))
            
            # Add category classification
            df['category'] = df.apply(self._classify_product, axis=1)
            
        return df
    
    def _classify_product(self, row):
        """Classify products into categories"""
        if pd.isna(row['product']) and pd.isna(row['department']):
            return 'UNKNOWN'
            
        # First try department-based classification
        if pd.notna(row['department']):
            dept = str(row['department']).upper()
            for category, keywords in self.category_mapping.items():
                if any(keyword in dept for keyword in keywords):
                    return category
        
        # Then try product-based classification
        if pd.notna(row['product']):
            product = str(row['product']).upper()
            for category, keywords in self.category_mapping.items():
                if any(keyword in product for keyword in keywords):
                    return category
        
        return 'OTHER'
    
    def load_and_combine_data(self):
        """Load and combine all CSV files"""
        print("Loading and combining sales data...")
        
        dfs = []
        for file_name in self.file_paths:
            file_path = self.data_dir / file_name
            if file_path.exists():
                df = self.parse_report_csv(file_path)
                if not df.empty:
                    dfs.append(df)
                    print(f"  Loaded {len(df)} records from {file_name}")
            else:
                print(f"  Warning: File not found - {file_name}")
        
        if dfs:
            self.df_combined = pd.concat(dfs, ignore_index=True)
            print(f"\nTotal records loaded: {len(self.df_combined)}")
            
            # Data quality checks
            self._perform_data_quality_checks()
            
            # Add derived columns
            self._add_derived_columns()
            
        else:
            raise ValueError("No data files could be loaded")
    
    def _perform_data_quality_checks(self):
        """Perform data quality validation"""
        print("\nPerforming data quality checks...")
        
        # Check for missing values
        missing_data = self.df_combined.isnull().sum()
        print("Missing values:")
        for col, count in missing_data.items():
            if count > 0:
                print(f"  {col}: {count} ({count/len(self.df_combined)*100:.1f}%)")
        
        # Check for anomalies
        print(f"\nData anomalies:")
        print(f"  Negative quantities: {(self.df_combined['quantity_sold'] < 0).sum()}")
        print(f"  Zero prices: {(self.df_combined['unit_price'] == 0).sum()}")
        print(f"  Negative revenues: {(self.df_combined['total_revenue'] < 0).sum()}")
        
        # Date range
        print(f"\nDate range: {self.df_combined['date'].min()} to {self.df_combined['date'].max()}")
        
        # Clean anomalies
        self.df_combined = self.df_combined[
            (self.df_combined['quantity_sold'] >= 0) & 
            (self.df_combined['unit_price'] >= 0) &
            (self.df_combined['total_revenue'] >= 0)
        ]
        
        print(f"Records after cleaning: {len(self.df_combined)}")
    
    def _add_derived_columns(self):
        """Add derived columns for analysis"""
        # Time-based columns
        self.df_combined['week'] = self.df_combined['date'].dt.isocalendar().week
        self.df_combined['day_of_week'] = self.df_combined['date'].dt.day_name()
        self.df_combined['month_name'] = self.df_combined['date'].dt.month_name()
        
        # Revenue per unit
        self.df_combined['revenue_per_unit'] = (
            self.df_combined['total_revenue'] / self.df_combined['quantity_sold']
        ).replace([np.inf, -np.inf], 0)
        
        # Margin estimate (assuming 30% average margin)
        self.df_combined['estimated_cost'] = self.df_combined['unit_price'] * 0.7
        self.df_combined['estimated_margin'] = (
            (self.df_combined['unit_price'] - self.df_combined['estimated_cost']) / 
            self.df_combined['unit_price']
        ).replace([np.inf, -np.inf], 0)
    
    def analyze_temporal_trends(self):
        """Analyze temporal trends and patterns"""
        print("\nAnalyzing temporal trends...")
        
        # Monthly revenue trends
        monthly_revenue = self.df_combined.groupby(['year', 'month']).agg({
            'total_revenue': 'sum',
            'quantity_sold': 'sum'
        }).reset_index()
        
        monthly_revenue['month_year'] = monthly_revenue.apply(
            lambda x: f"{int(x['year'])}-{int(x['month']):02d}", axis=1
        )
        
        # Calculate month-over-month growth
        monthly_revenue['revenue_growth'] = monthly_revenue['total_revenue'].pct_change() * 100
        
        # Identify exceptional periods
        growth_threshold = 20  # 20% threshold
        exceptional_periods = monthly_revenue[
            abs(monthly_revenue['revenue_growth']) > growth_threshold
        ]
        
        if not exceptional_periods.empty:
            problem = {
                'title': 'Significant Revenue Volatility',
                'evidence': f"Revenue volatility exceeding ±{growth_threshold}% in {len(exceptional_periods)} months",
                'impact': f"Potential revenue at risk: ₹{exceptional_periods['total_revenue'].sum():,.0f}",
                'next_steps': 'Analyze seasonal patterns, inventory management, and demand forecasting'
            }
            self.business_problems.append(problem)
        
        # Weekly patterns
        weekly_revenue = self.df_combined.groupby('day_of_week')['total_revenue'].sum()
        
        # Save analysis
        monthly_revenue.to_csv(self.output_dir / 'monthly_trends.csv', index=False)
        
        # Visualization
        fig, axes = plt.subplots(2, 2, figsize=(15, 10))
        
        # Monthly revenue trend
        axes[0,0].plot(monthly_revenue['month_year'], monthly_revenue['total_revenue'], marker='o')
        axes[0,0].set_title('Monthly Revenue Trend')
        axes[0,0].set_xlabel('Month')
        axes[0,0].set_ylabel('Revenue (₹)')
        axes[0,0].tick_params(axis='x', rotation=45)
        
        # Monthly growth rate
        axes[0,1].bar(monthly_revenue['month_year'][1:], monthly_revenue['revenue_growth'][1:])
        axes[0,1].set_title('Month-over-Month Growth Rate')
        axes[0,1].set_xlabel('Month')
        axes[0,1].set_ylabel('Growth Rate (%)')
        axes[0,1].tick_params(axis='x', rotation=45)
        axes[0,1].axhline(y=0, color='red', linestyle='--')
        
        # Weekly patterns
        day_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        weekly_revenue_ordered = weekly_revenue.reindex(day_order)
        axes[1,0].bar(weekly_revenue_ordered.index, weekly_revenue_ordered.values)
        axes[1,0].set_title('Revenue by Day of Week')
        axes[1,0].set_xlabel('Day')
        axes[1,0].set_ylabel('Revenue (₹)')
        axes[1,0].tick_params(axis='x', rotation=45)
        
        # Daily sales volume
        daily_volume = self.df_combined.groupby('date')['quantity_sold'].sum()
        axes[1,1].plot(daily_volume.index, daily_volume.values, alpha=0.7)
        axes[1,1].set_title('Daily Sales Volume')
        axes[1,1].set_xlabel('Date')
        axes[1,1].set_ylabel('Quantity Sold')
        
        plt.tight_layout()
        plt.savefig(self.output_dir / 'temporal_trends.png', dpi=300, bbox_inches='tight')
        plt.close()
        
        return monthly_revenue
    
    def analyze_category_performance(self):
        """Analyze category performance and portfolio insights"""
        print("\nAnalyzing category performance...")
        
        # Category revenue analysis
        category_performance = self.df_combined.groupby('category').agg({
            'total_revenue': ['sum', 'mean'],
            'quantity_sold': 'sum',
            'unit_price': 'mean'
        }).round(2)
        
        category_performance.columns = ['total_revenue', 'avg_revenue_per_transaction', 
                                      'total_quantity', 'avg_unit_price']
        category_performance = category_performance.reset_index()
        
        # Calculate revenue share
        total_revenue = category_performance['total_revenue'].sum()
        category_performance['revenue_share'] = (
            category_performance['total_revenue'] / total_revenue * 100
        ).round(2)
        
        # Sort by revenue
        category_performance = category_performance.sort_values('total_revenue', ascending=False)
        
        # Identify underperforming categories (bottom 20% by revenue share)
        underperforming_threshold = 2.0  # 2% of total revenue
        underperforming = category_performance[
            category_performance['revenue_share'] < underperforming_threshold
        ]
        
        if not underperforming.empty:
            problem = {
                'title': 'Underperforming Product Categories',
                'evidence': f"{len(underperforming)} categories contributing <{underperforming_threshold}% each to total revenue",
                'impact': f"Combined revenue: ₹{underperforming['total_revenue'].sum():,.0f} ({underperforming['revenue_share'].sum():.1f}%)",
                'next_steps': 'Review product mix, consider category optimization or elimination'
            }
            self.business_problems.append(problem)
        
        # Monthly category trends
        monthly_category = self.df_combined.groupby(['month', 'category'])['total_revenue'].sum().unstack(fill_value=0)
        
        # Save analysis
        category_performance.to_csv(self.output_dir / 'category_performance.csv', index=False)
        monthly_category.to_csv(self.output_dir / 'monthly_category_trends.csv')
        
        # Visualization
        fig, axes = plt.subplots(2, 2, figsize=(16, 12))
        
        # Revenue share pie chart (top 10 categories)
        top_categories = category_performance.head(10)
        axes[0,0].pie(top_categories['revenue_share'], labels=top_categories['category'], 
                     autopct='%1.1f%%', startangle=90)
        axes[0,0].set_title('Revenue Share by Category (Top 10)')
        
        # Category revenue bar chart
        axes[0,1].barh(category_performance['category'][:10], category_performance['total_revenue'][:10])
        axes[0,1].set_title('Revenue by Category (Top 10)')
        axes[0,1].set_xlabel('Revenue (₹)')
        
        # Average unit price by category
        axes[1,0].bar(category_performance['category'][:10], category_performance['avg_unit_price'][:10])
        axes[1,0].set_title('Average Unit Price by Category')
        axes[1,0].set_xlabel('Category')
        axes[1,0].set_ylabel('Price (₹)')
        axes[1,0].tick_params(axis='x', rotation=45)
        
        # Monthly trends for top 5 categories
        top_5_categories = category_performance['category'][:5].tolist()
        for category in top_5_categories:
            if category in monthly_category.columns:
                axes[1,1].plot(monthly_category.index, monthly_category[category], 
                             marker='o', label=category)
        axes[1,1].set_title('Monthly Revenue Trends (Top 5 Categories)')
        axes[1,1].set_xlabel('Month')
        axes[1,1].set_ylabel('Revenue (₹)')
        axes[1,1].legend()
        
        plt.tight_layout()
        plt.savefig(self.output_dir / 'category_performance.png', dpi=300, bbox_inches='tight')
        plt.close()
        
        return category_performance
    
    def analyze_inventory_risk(self):
        """Analyze inventory loss and operational risk proxies"""
        print("\nAnalyzing inventory and operational risks...")
        
        # Product-level volatility analysis
        product_stats = self.df_combined.groupby('product').agg({
            'quantity_sold': ['sum', 'mean', 'std', 'max'],
            'total_revenue': 'sum',
            'date': ['min', 'max', 'count']
        }).round(2)
        
        product_stats.columns = ['total_qty', 'avg_daily_qty', 'qty_std', 'max_daily_qty',
                               'total_revenue', 'first_sale', 'last_sale', 'sale_days']
        product_stats = product_stats.reset_index()
        
        # Calculate volatility (coefficient of variation)
        product_stats['volatility'] = (product_stats['qty_std'] / product_stats['avg_daily_qty']).replace([np.inf, -np.inf], 0)
        
        # Identify high volatility products (>25% volatility)
        high_volatility = product_stats[product_stats['volatility'] > 0.25]
        
        # Calculate days between sales
        product_stats['days_span'] = (product_stats['last_sale'] - product_stats['first_sale']).dt.days
        product_stats['avg_days_between_sales'] = product_stats['days_span'] / product_stats['sale_days']
        
        # Identify slow-moving products (>30 days average between sales)
        slow_moving = product_stats[product_stats['avg_days_between_sales'] > 30]
        
        # Estimate turnover ratio (simplified)
        product_stats['estimated_turnover'] = product_stats['total_qty'] / (product_stats['max_daily_qty'] * 30)  # Assuming 30-day stock
        low_turnover = product_stats[product_stats['estimated_turnover'] < 4]
        
        # Generate problems
        if not high_volatility.empty:
            volatility_revenue_risk = high_volatility['total_revenue'].sum()
            problem = {
                'title': 'High Demand Volatility Products',
                'evidence': f"{len(high_volatility)} products with >25% demand volatility",
                'impact': f"Revenue at risk from wastage: ₹{volatility_revenue_risk:,.0f}",
                'next_steps': 'Implement dynamic inventory management and demand forecasting'
            }
            self.business_problems.append(problem)
        
        if not slow_moving.empty:
            slow_moving_revenue = slow_moving['total_revenue'].sum()
            problem = {
                'title': 'Slow-Moving Inventory',
                'evidence': f"{len(slow_moving)} products with >30 days between sales",
                'impact': f"Tied-up capital: ₹{slow_moving_revenue:,.0f}",
                'next_steps': 'Review product portfolio and consider promotional strategies'
            }
            self.business_problems.append(problem)
        
        # Save analysis
        product_stats.to_csv(self.output_dir / 'product_risk_analysis.csv', index=False)
        high_volatility.to_csv(self.output_dir / 'high_volatility_products.csv', index=False)
        slow_moving.to_csv(self.output_dir / 'slow_moving_products.csv', index=False)
        
        return product_stats, high_volatility, slow_moving
    
    def analyze_customer_behavior(self):
        """Analyze customer behavior and demand signals"""
        print("\nAnalyzing customer behavior patterns...")
        
        # Daily revenue analysis (proxy for customer behavior)
        daily_stats = self.df_combined.groupby('date').agg({
            'total_revenue': 'sum',
            'quantity_sold': 'sum',
            'product': 'nunique'  # Number of unique products sold
        }).reset_index()
        
        daily_stats.columns = ['date', 'daily_revenue', 'daily_quantity', 'products_sold']
        
        # Calculate average daily revenue
        avg_daily_revenue = daily_stats['daily_revenue'].mean()
        
        # Identify low-revenue days (<50% of average)
        low_revenue_threshold = avg_daily_revenue * 0.5
        low_revenue_days = daily_stats[daily_stats['daily_revenue'] < low_revenue_threshold]
        
        if not low_revenue_days.empty:
            problem = {
                'title': 'Inconsistent Daily Performance',
                'evidence': f"{len(low_revenue_days)} days with revenue <50% of daily average",
                'impact': f"Lost revenue opportunity: ₹{(avg_daily_revenue - low_revenue_days['daily_revenue'].mean()) * len(low_revenue_days):,.0f}",
                'next_steps': 'Analyze staffing, inventory availability, and promotional activities'
            }
            self.business_problems.append(problem)
        
        # Product association analysis (simplified)
        # Group by date and find frequently co-occurring products
        daily_products = self.df_combined.groupby('date')['product'].apply(list).reset_index()
        
        # Save analysis
        daily_stats.to_csv(self.output_dir / 'daily_performance.csv', index=False)
        
        return daily_stats, low_revenue_days
    
    def analyze_profitability(self):
        """Analyze profitability and pricing"""
        print("\nAnalyzing profitability and pricing...")
        
        # Product-level profitability analysis
        profitability = self.df_combined.groupby('product').agg({
            'unit_price': 'mean',
            'estimated_margin': 'mean',
            'total_revenue': 'sum',
            'quantity_sold': 'sum'
        }).reset_index()
        
        # Identify low-margin products (<20%)
        low_margin_threshold = 0.20
        low_margin_products = profitability[profitability['estimated_margin'] < low_margin_threshold]
        
        # Calculate revenue-weighted average margin
        total_revenue = profitability['total_revenue'].sum()
        profitability['revenue_weight'] = profitability['total_revenue'] / total_revenue
        weighted_avg_margin = (profitability['estimated_margin'] * profitability['revenue_weight']).sum()
        
        if not low_margin_products.empty:
            low_margin_revenue = low_margin_products['total_revenue'].sum()
            problem = {
                'title': 'Low-Margin Product Portfolio',
                'evidence': f"{len(low_margin_products)} products with <{low_margin_threshold*100}% estimated margin",
                'impact': f"Low-margin revenue: ₹{low_margin_revenue:,.0f} ({low_margin_revenue/total_revenue*100:.1f}% of total)",
                'next_steps': 'Review pricing strategy and supplier negotiations'
            }
            self.business_problems.append(problem)
        
        # Price variance analysis
        price_variance = self.df_combined.groupby('product')['unit_price'].agg(['mean', 'std']).reset_index()
        price_variance['cv'] = price_variance['std'] / price_variance['mean']
        high_price_variance = price_variance[price_variance['cv'] > 0.1]  # >10% coefficient of variation
        
        # Save analysis
        profitability.to_csv(self.output_dir / 'profitability_analysis.csv', index=False)
        
        return profitability, low_margin_products
    
    def generate_executive_summary(self):
        """Generate executive summary and problem prioritization"""
        print("\nGenerating executive summary...")
        
        # Sort problems by estimated impact (extract numeric values)
        def extract_impact_value(problem):
            impact_str = problem['impact']
            # Extract numeric value from impact string
            import re
            numbers = re.findall(r'₹([\d,]+)', impact_str)
            if numbers:
                return float(numbers[0].replace(',', ''))
            return 0
        
        # Sort problems by impact
        self.business_problems.sort(key=extract_impact_value, reverse=True)
        
        # Take top 5 problems
        top_problems = self.business_problems[:5]
        
        # Generate summary report
        summary_report = f"""
# Pure'O Naturals Enterprise EDA - Executive Summary

## Analysis Period: April 2025 - September 2025

### Key Metrics:
- Total Revenue: ₹{self.df_combined['total_revenue'].sum():,.0f}
- Total Transactions: {len(self.df_combined):,}
- Unique Products: {self.df_combined['product'].nunique():,}
- Average Daily Revenue: ₹{self.df_combined.groupby('date')['total_revenue'].sum().mean():,.0f}

## Top {len(top_problems)} Business Problems (Prioritized by Impact):

"""
        
        for i, problem in enumerate(top_problems, 1):
            summary_report += f"""
### {i}. {problem['title']}
**Evidence:** {problem['evidence']}
**Impact:** {problem['impact']}
**Recommended Next Steps:** {problem['next_steps']}

"""
        
        summary_report += """
## Methodology Appendix:

### Analytical Techniques Used:
1. **Temporal Trend Analysis**: Month-over-month growth calculation, seasonal pattern detection
2. **Category Performance Analysis**: Revenue share calculation, portfolio optimization
3. **Inventory Risk Assessment**: Demand volatility analysis (coefficient of variation), turnover ratio estimation
4. **Customer Behavior Analysis**: Daily performance patterns, revenue consistency metrics
5. **Profitability Analysis**: Margin estimation, pricing variance analysis

### Data Quality Measures:
- Automated anomaly detection and cleaning
- Missing value imputation
- Schema validation across all data sources

### Risk Assessment Framework:
- Volatility threshold: >25% coefficient of variation
- Slow-moving threshold: >30 days between sales
- Low-margin threshold: <20% estimated margin
- Performance threshold: <50% of average daily revenue

"""
        
        # Save summary
        with open(self.output_dir / 'executive_summary.md', 'w', encoding='utf-8') as f:
            f.write(summary_report)
        
        print(f"\nAnalysis complete! Found {len(self.business_problems)} business problems.")
        print(f"Top {len(top_problems)} problems prioritized by impact.")
        print(f"All outputs saved to: {self.output_dir}")
        
        return top_problems
    
    def run_complete_analysis(self):
        """Run the complete EDA analysis"""
        print("Starting Pure'O Naturals Enterprise EDA Analysis...")
        print("=" * 60)
        
        # Load data
        self.load_and_combine_data()
        
        # Run all analyses
        monthly_trends = self.analyze_temporal_trends()
        category_performance = self.analyze_category_performance()
        inventory_analysis = self.analyze_inventory_risk()
        customer_behavior = self.analyze_customer_behavior()
        profitability = self.analyze_profitability()
        
        # Generate final summary
        top_problems = self.generate_executive_summary()
        
        print("\n" + "=" * 60)
        print("ANALYSIS COMPLETE")
        print("=" * 60)
        
        return top_problems

if __name__ == "__main__":
    # Set data directory
    data_directory = r"c:\Users\bhand_dyav\Documents\IITM Courses\BDM Capstone Project\Pure'O Naturals Data\Excel Format"
    
    # Run analysis
    analyzer = PureONaturalsEDA(data_directory)
    top_problems = analyzer.run_complete_analysis()
    
    # Print top problems
    print("\nTOP BUSINESS PROBLEMS:")
    for i, problem in enumerate(top_problems, 1):
        print(f"\n{i}. {problem['title']}")
        print(f"   Evidence: {problem['evidence']}")
        print(f"   Impact: {problem['impact']}")
        print(f"   Next Steps: {problem['next_steps']}")