import pandas as pd
import matplotlib
matplotlib.use('Agg') # Use non-interactive backend
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Define paths
DATA_DIR = r"c:\Users\bhand_dyav\Documents\IITM Courses\BDM Capstone Project\0.2. Pure'O Naturals Data"
OUTPUT_DIR = os.path.join(DATA_DIR, "charts", "section6")
CLEANED_SALES_PATH = os.path.join(DATA_DIR, "cleaned_sales.csv")
WASTAGE_RISK_PATH = os.path.join(DATA_DIR, "wastage_risk.csv") # Using this if useful, or cleaned_sales

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load Data
print("Loading data...")
df_sales = pd.read_csv(CLEANED_SALES_PATH)
df_sales['date'] = pd.to_datetime(df_sales['date'])

# --- Figure 5.7: Wastage Risk Heatmap (Proxy) ---
# Logic: High Volatility + Perishable Category = High Wastage Risk
# We will aggregate by Category.
print("Generating Figure 5.7...")

# Map categories to "Perishable" vs "Non-Perishable"
perishables = ['Fruits', 'Vegetables', 'Dairy']
# Normalize category names if needed
df_sales['category'] = df_sales['category'].str.title() 

# Calculate Volatility (CV) per Product
product_stats = df_sales.groupby(['product', 'category']).agg({
    'quantity_sold': ['mean', 'std'],
    'total_revenue': 'sum'
}).reset_index()
product_stats.columns = ['product', 'category', 'mean_qty', 'std_qty', 'total_revenue']
product_stats['cv'] = product_stats['std_qty'] / product_stats['mean_qty']
product_stats['cv'] = product_stats['cv'].fillna(0)

# Define Risk Score: CV * Revenue (Proxy for "Value at Risk")
# Weight Perishables higher (e.g., 2x risk for same volatility)
product_stats['is_perishable'] = product_stats['category'].isin(perishables)
product_stats['risk_weight'] = product_stats['is_perishable'].apply(lambda x: 2.0 if x else 1.0)
product_stats['risk_score'] = product_stats['cv'] * product_stats['total_revenue'] * product_stats['risk_weight']

# Aggregate by Category
category_risk = product_stats.groupby('category')['risk_score'].sum().sort_values(ascending=False)
total_risk = category_risk.sum()
category_risk_pct = (category_risk / total_risk) * 100

# Plot
plt.figure(figsize=(10, 6))
colors = ['#ff9999' if x in perishables else '#66b3ff' for x in category_risk.index]
bars = plt.barh(category_risk.index, category_risk_pct, color=colors)
plt.xlabel('Share of Estimated Wastage Risk (%)')
plt.title('Wastage Risk Contribution by Category\n(Perishables account for majority of risk)')
plt.gca().invert_yaxis()

# Add value labels
for i, v in enumerate(category_risk_pct):
    plt.text(v + 0.5, i, f'{v:.1f}%', va='center')

plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, "Figure_6_7_Wastage_Risk.png"))
plt.close()


# --- Figure 5.8: The 'Unknown' Revenue Wedge ---
print("Generating Figure 5.8...")

# Identify "Unknown" revenue
# Looking at the CSV, category 'unknown' exists.
unknown_mask = df_sales['category'].str.lower() == 'unknown'
unknown_revenue = df_sales[unknown_mask]['total_revenue'].sum()
known_revenue = df_sales[~unknown_mask]['total_revenue'].sum()

# Plot Pie Chart
plt.figure(figsize=(8, 8))
labels = ['Known Categories', 'Unknown / Unclassified']
sizes = [known_revenue, unknown_revenue]
colors = ['#4CAF50', '#A9A9A9'] # Green for good, Grey for unknown
explode = (0, 0.1)  # explode the unknown slice

plt.pie(sizes, explode=explode, labels=labels, colors=colors, autopct='%1.1f%%',
        shadow=True, startangle=140)
plt.title('The "Data Fog": Revenue Share of Unclassified Items')
plt.axis('equal')

plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, "Figure_6_8_Unknown_Impact.png"))
plt.close()


# --- Figure 5.9: Day-of-Week Efficiency Analysis ---
print("Generating Figure 5.9...")

# Add Day of Week
df_sales['day_name'] = df_sales['date'].dt.day_name()
df_sales['day_num'] = df_sales['date'].dt.dayofweek # 0=Mon, 6=Sun

# Aggregate Daily Revenue
daily_revenue = df_sales.groupby(['date', 'day_name', 'day_num'])['total_revenue'].sum().reset_index()

# Calculate Average Revenue per Day of Week
dow_stats = daily_revenue.groupby(['day_num', 'day_name'])['total_revenue'].mean().reset_index()
dow_stats = dow_stats.sort_values('day_num')

# Identify Weekend
dow_stats['is_weekend'] = dow_stats['day_name'].isin(['Saturday', 'Sunday'])
colors = ['#1f77b4' if not x else '#ff7f0e' for x in dow_stats['is_weekend']] # Blue for weekday, Orange for weekend

# Plot
plt.figure(figsize=(10, 6))
bars = plt.bar(dow_stats['day_name'], dow_stats['total_revenue'], color=colors)

# Add labels
plt.ylabel('Average Daily Revenue (₹)')
plt.title('Average Daily Revenue: Weekday vs. Weekend')

# Add percentage lift annotation (approximate based on finding)
weekday_avg = dow_stats[~dow_stats['is_weekend']]['total_revenue'].mean()
weekend_avg = dow_stats[dow_stats['is_weekend']]['total_revenue'].mean()
lift = ((weekend_avg - weekday_avg) / weekday_avg) * 100

plt.axhline(y=weekday_avg, color='gray', linestyle='--', alpha=0.7, label=f'Weekday Avg: ₹{weekday_avg:,.0f}')
plt.axhline(y=weekend_avg, color='orange', linestyle='--', alpha=0.7, label=f'Weekend Avg: ₹{weekend_avg:,.0f}')

# Add text for lift
plt.text(5.5, weekend_avg * 1.05, f'+{lift:.1f}% Lift', ha='center', color='red', fontweight='bold')

plt.legend()
plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, "Figure_6_9_Day_of_Week_Efficiency.png"))
plt.close()

print("All charts generated successfully.")

