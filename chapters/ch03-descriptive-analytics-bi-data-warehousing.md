---
title: "Descriptive Analytics II: Business Intelligence and Data Warehousing"
subtitle: "From Data Storage to Strategic Decision-Making"
short_title: "BI & Data Warehousing"
description: |
  This chapter explores the foundations of Business Intelligence (BI) and data warehousing,
  covering warehouse architectures, ETL processes, OLAP operations, and performance management
  frameworks including Balanced Scorecards and Six Sigma.
label: ch03-bi-data-warehousing
date: 2026-02-11
tags:
  - business-intelligence
  - data-warehousing
  - ETL
  - OLAP
  - balanced-scorecard
  - performance-management
keywords:
  - data warehouse
  - business intelligence
  - ETL
  - data mart
  - OLAP
  - balanced scorecard
  - Six Sigma
  - KPI
  - business performance management
abbreviations:
  BI: Business Intelligence
  DW: Data Warehouse
  EDW: Enterprise Data Warehouse
  ETL: Extraction, Transformation, and Load
  ELT: Extraction, Load, and Transformation
  OLAP: Online Analytical Processing
  OLTP: Online Transaction Processing
  KPI: Key Performance Indicator
  BPM: Business Performance Management
  BSC: Balanced Scorecard
  ROI: Return on Investment
  DMAIC: Define, Measure, Analyze, Improve, Control
  ODS: Operational Data Store
  SQL: Structured Query Language
  CRM: Customer Relationship Management
  ERP: Enterprise Resource Planning
  EDM: Enterprise Data Management
---

# Descriptive Analytics II: Business Intelligence and Data Warehousing

In the previous chapter, we explored the foundations of descriptive analytics and how organizations use data to understand what has happened. In this chapter, we take the next step by examining the **infrastructure** that makes large-scale analytics possible: **Business Intelligence (BI)** systems and **data warehousing**. These technologies form the backbone of modern analytical organizations, enabling decision-makers to access clean, consolidated, and historically rich data for strategic insights.

We will also explore how organizations measure and manage performance through frameworks like **Business Performance Management (BPM)**, **Balanced Scorecards**, and **Six Sigma** — closing the loop between data collection, analysis, and action.

:::{figure} ../images/ch03-bi-warehouse-hero.png
:label: fig-ch03-hero
:alt: A modern visualization of business intelligence and data warehousing concepts showing data flowing from multiple sources into a centralized warehouse and then to analytical dashboards
:width: 100%
:align: center

Business Intelligence and Data Warehousing transform raw organizational data into strategic decision-making power.
:::

---

## 3.1 Opening Vignette: Targeting Tax Fraud with Business Intelligence and Data Warehousing

:::{admonition} Real-World Scenario
:class: tip

**How can government agencies use BI and data warehousing to detect and prevent tax fraud?**
:::

Tax fraud costs governments billions of dollars annually. Traditional methods of detecting fraudulent returns — manual audits, random sampling, and tip-based investigations — are slow, expensive, and catch only a fraction of fraudulent activity.

Several state and federal agencies have turned to **business intelligence and data warehousing** to revolutionize their approach to tax fraud detection. By consolidating data from multiple sources — tax filings, employer reports, banking records, property databases, and social media — into a **centralized data warehouse**, these agencies can apply sophisticated analytics to identify suspicious patterns.

The key capabilities enabled by this BI approach include:

- **Cross-referencing** data across agencies and databases that were previously siloed
- **Pattern recognition** to identify returns that deviate from expected norms
- **Predictive scoring** to prioritize which returns to audit, maximizing recovery per audit dollar
- **Real-time dashboards** providing investigators with a unified view of taxpayer activity
- **Historical trending** to track repeat offenders and evolving fraud schemes

:::{note}
The results have been dramatic. One state agency reported a **300% increase** in fraud detection rates after implementing their BI-driven warehouse, while reducing the average investigation time by 40%. The ROI on the data warehouse investment was achieved within the first year of operation.
:::

**Questions for the Opening Vignette:**

1. What data sources would be most valuable for a tax fraud detection warehouse?
2. Why is data integration so critical for this application?
3. What role does historical data play in detecting fraud patterns?

---

## 3.2 Business Intelligence and Data Warehousing

**Business Intelligence (BI)** is an umbrella term that encompasses the strategies, technologies, and practices used to collect, integrate, analyze, and present business data. The goal of BI is to support better business decision-making — turning raw data into actionable intelligence.

At the heart of most BI systems lies the **data warehouse** — a specialized database designed for analytical queries rather than transaction processing.

:::{figure} ../images/ch03-bi-ecosystem.png
:label: fig-ch03-bi-ecosystem
:alt: Diagram showing the BI ecosystem with data sources feeding into a data warehouse which then supports reporting, OLAP, dashboards, and data mining
:width: 90%
:align: center

The Business Intelligence ecosystem: data flows from operational sources through the warehouse to analytical tools and end users.
:::

### What Is a Data Warehouse?

:::{prf:definition} Data Warehouse
:label: def-data-warehouse

A **data warehouse** is a subject-oriented, integrated, time-variant, and nonvolatile collection of data in support of management's decision-making process.

— W. H. Inmon, the "Father of Data Warehousing"
:::

In simpler terms, a data warehouse is a large, centralized repository that stores **historical data** from various operational systems across an organization. Unlike transactional databases (which support day-to-day operations like processing orders), a data warehouse is optimized for **complex queries and analysis**.

### A Historical Perspective to Data Warehousing

The concept of data warehousing evolved through several stages:

:::{list-table} Evolution of Data Warehousing
:label: tbl-dw-history
:header-rows: 1

* - Era
  - Period
  - Key Development
* - Mainframe Reports
  - 1960s–1970s
  - Batch reports generated from operational databases
* - Decision Support Systems
  - 1980s
  - Dedicated analytical databases; emergence of the term "data warehouse"
* - Enterprise Data Warehousing
  - 1990s
  - Inmon and Kimball methodologies; commercial DW platforms
* - Web and Real-Time BI
  - 2000s
  - Self-service BI, web dashboards, near real-time data loading
* - Cloud and Big Data
  - 2010s–Present
  - Cloud data warehouses (Snowflake, BigQuery, Redshift), data lakes, streaming analytics
:::

### Characteristics of Data Warehousing

A data warehouse has four defining characteristics, as established by Bill Inmon:

::::{grid} 1 1 2 2

:::{card} 📋 Subject-Oriented
Data is organized around **key business subjects** (customers, products, sales) rather than around applications or departments. This makes it easier to analyze specific business areas.
:::

:::{card} 🔗 Integrated
Data from **multiple heterogeneous sources** (CRM, ERP, spreadsheets, external feeds) is cleaned, transformed, and consolidated into a consistent format. Naming conventions, units, and encoding schemes are unified.
:::

:::{card} ⏱️ Time-Variant
The warehouse maintains **historical data** over long periods (5–10+ years). Every record is associated with a time dimension, enabling trend analysis and comparisons over time.
:::

:::{card} 🔒 Nonvolatile
Once data enters the warehouse, it is **not updated or deleted** through normal operations. Data is loaded and accessed — not modified. This provides a stable, trustworthy analytical foundation.
:::

::::

### Data Marts

:::{prf:definition} Data Mart
:label: def-data-mart

A **data mart** is a subset of a data warehouse, focused on a specific business area, department, or subject. Data marts provide a more targeted and manageable view of the data for particular user groups.
:::

Data marts can be:
- **Dependent** — fed from the enterprise data warehouse
- **Independent** — loaded directly from source systems, bypassing the EDW

:::{list-table} Data Warehouse vs. Data Mart
:label: tbl-dw-vs-mart
:header-rows: 1

* - Feature
  - Data Warehouse
  - Data Mart
* - Scope
  - Enterprise-wide
  - Department or subject-specific
* - Data Sources
  - Many (across organization)
  - Few (relevant to the department)
* - Size
  - 100GB to petabytes
  - Typically under 100GB
* - Users
  - Entire organization
  - Specific department or team
* - Build Time
  - Months to years
  - Weeks to months
* - Cost
  - High
  - Lower
:::

### Operational Data Stores

An **Operational Data Store (ODS)** is a database that integrates data from multiple sources for operational reporting and light analytical queries. Unlike a data warehouse, an ODS:

- Contains **current or near-current** data (not historical)
- Supports some **read-write** operations
- Serves as a staging area between operational systems and the data warehouse

:::{tip}
Think of the ODS as a "real-time snapshot" of your business, while the data warehouse is the "complete historical record."
:::

### Enterprise Data Warehouses (EDW)

An **Enterprise Data Warehouse (EDW)** is a centralized warehouse that serves the entire organization. It provides a **single source of truth** by integrating data from all business units and functional areas. EDWs are the most comprehensive — and most expensive — form of data warehousing.

### Metadata

**Metadata** is "data about data." In the context of data warehousing, metadata describes:

- **Where** data came from (source systems)
- **How** it was transformed (business rules, mappings)
- **When** it was loaded (timestamps, refresh schedules)
- **What** it means (definitions, units, business context)

:::{list-table} Types of Metadata in Data Warehousing
:label: tbl-metadata-types
:header-rows: 1

* - Type
  - Description
  - Example
* - Technical Metadata
  - Database structures, table schemas, data types
  - `customer_id INT PRIMARY KEY`
* - Business Metadata
  - Business definitions, ownership, context
  - "Revenue = gross sales minus returns"
* - Operational Metadata
  - ETL job logs, load timestamps, data lineage
  - "Loaded 2.3M rows at 02:15 AM on 2026-02-10"
:::

:::{admonition} Application Case 3.1 — TELCOs Leverage Data Warehousing
:class: note
:icon: false

**A Better Data Plan: Well-Established TELCOs Leverage Data Warehousing and Analytics to Stay on Top in a Competitive Industry**

In the fiercely competitive telecommunications industry, established carriers face constant pressure from nimble newcomers and evolving customer expectations. Several major telcos have turned to enterprise data warehousing as a strategic weapon.

By consolidating **billions of call detail records**, customer interaction logs, network performance data, and competitive intelligence into a unified data warehouse, these companies can:

- **Predict churn** by analyzing usage patterns and customer sentiment
- **Optimize network investments** based on geographic demand analysis
- **Personalize offers** using customer segmentation and lifetime value modeling
- **Detect fraud** in real-time by comparing call patterns against known fraud signatures

One major carrier reported that their DW investment generated a **15:1 ROI** within three years, primarily through improved customer retention and more efficient marketing spend.
:::

---

## 3.3 Data Warehousing Process

Building and maintaining a data warehouse is not a one-time project — it is an ongoing **process** that follows a structured lifecycle:

:::{mermaid}
:label: fig-ch03-dw-process

flowchart TD
    A["1. Business Requirements\nAnalysis"] --> B["2. Data Modeling\n& Design"]
    B --> C["3. ETL Development\n(Extract, Transform, Load)"]
    C --> D["4. Data Quality\nAssurance"]
    D --> E["5. Deployment\n& Loading"]
    E --> F["6. Analytics\n& Reporting"]
    F --> G["7. Monitoring\n& Optimization"]
    G --> A

    style A fill:#4a90d9,color:#fff
    style B fill:#50c878,color:#fff
    style C fill:#f5a623,color:#fff
    style D fill:#d0021b,color:#fff
    style E fill:#9b59b6,color:#fff
    style F fill:#3498db,color:#fff
    style G fill:#e67e22,color:#fff
:::

The key steps in the data warehousing process include:

1. **Business Requirements Analysis** — Identify what questions the business needs to answer. Which KPIs matter? What decisions will the DW support?

2. **Data Modeling & Design** — Design the warehouse schema. Choose between star schema, snowflake schema, or other modeling approaches. Define dimensions (time, geography, product) and facts (sales amounts, quantities).

3. **ETL Development** — Build the pipelines that extract data from source systems, transform it into the warehouse format, and load it into the warehouse.

4. **Data Quality Assurance** — Validate that data is accurate, complete, consistent, and timely. Implement data profiling, cleansing rules, and quality metrics.

5. **Deployment & Loading** — Deploy the warehouse and begin regular data loads (nightly batch, near-real-time, or streaming).

6. **Analytics & Reporting** — Enable users to query the warehouse through BI tools, dashboards, OLAP cubes, and ad-hoc SQL queries.

7. **Monitoring & Optimization** — Continuously monitor query performance, data freshness, storage growth, and user satisfaction. Optimize as needed.

:::{important}
The data warehousing process is **iterative**, not linear. As business needs evolve, new data sources emerge, and analytics capabilities mature, the warehouse must adapt continuously.
:::

---

## 3.4 Data Warehousing Architectures

The architecture of a data warehouse defines how data flows from source systems through intermediate layers to end-user tools. Several architectural patterns have emerged over the decades.

:::{figure} ../images/ch03-dw-architecture.png
:label: fig-ch03-architecture
:alt: Comparison of three data warehouse architectures showing data flow from sources through staging, warehouse, and data marts to end users
:width: 95%
:align: center

Common data warehouse architectures differ in how they organize the flow from source systems to analytical consumers.
:::

The three most prominent architectures are:

:::{list-table} Major Data Warehouse Architectures
:label: tbl-architectures
:header-rows: 1

* - Architecture
  - Champion
  - Approach
  - Best For
* - **Inmon (Top-Down)**
  - Bill Inmon
  - Build the EDW first; derive data marts from it
  - Large enterprises needing a single source of truth
* - **Kimball (Bottom-Up)**
  - Ralph Kimball
  - Build individual data marts first; integrate into a "data warehouse bus"
  - Organizations wanting quick wins and iterative delivery
* - **Hybrid**
  - Various
  - Combines elements of both; EDW for core data, marts for specific needs
  - Organizations balancing speed with enterprise consistency
:::

### Alternative Data Warehousing Architectures

Beyond the classic Inmon and Kimball approaches, modern organizations also consider:

- **Data Lake Architecture** — Store raw, unstructured, and semi-structured data in a data lake (e.g., Amazon S3, Azure Data Lake). Overlay a warehouse structure for analytical queries. Best for organizations with diverse data types (IoT, text, images).

- **Data Lakehouse** — A hybrid of data lake and data warehouse that provides the flexibility of a lake with the governance and performance of a warehouse. Technologies like **Databricks Delta Lake** and **Apache Iceberg** enable this pattern.

- **Cloud-Native Architecture** — Fully managed cloud data warehouses (Snowflake, Google BigQuery, Amazon Redshift) that separate storage and compute, enabling elastic scaling and pay-per-query pricing.

- **Data Mesh** — A decentralized approach where individual business domains own and manage their own data products, connected through a federated governance framework. Best for large, complex organizations with strong domain expertise.

:::{mermaid}
:label: fig-ch03-architectures-compare

graph LR
    subgraph "Inmon (Top-Down)"
        S1[Sources] --> EDW1[EDW]
        EDW1 --> DM1[Data Mart A]
        EDW1 --> DM2[Data Mart B]
    end

    subgraph "Kimball (Bottom-Up)"
        S2[Sources] --> DM3[Data Mart A]
        S2 --> DM4[Data Mart B]
        DM3 --> BUS[Conformed Dims]
        DM4 --> BUS
    end

    subgraph "Hybrid"
        S3[Sources] --> EDW2[EDW Core]
        S3 --> DM5[Independent Mart]
        EDW2 --> DM6[Dependent Mart]
    end
:::

### Which Architecture Is the Best?

:::{warning}
There is no universally "best" architecture. The right choice depends on your organization's size, budget, data maturity, and strategic goals.
:::

Key considerations when choosing an architecture:

| Factor | Favors Inmon | Favors Kimball | Favors Cloud/Lakehouse |
|--------|:------------:|:--------------:|:---------------------:|
| Data consistency | ✅ | ⚠️ | ✅ |
| Speed to deliver | ❌ | ✅ | ✅ |
| Upfront cost | High | Lower | Variable (pay-as-you-go) |
| Scalability | Moderate | Moderate | ✅ Excellent |
| Unstructured data | ❌ | ❌ | ✅ |
| Governance maturity needed | High | Moderate | Moderate–High |

---

## 3.5 Data Integration and the Extraction, Transformation, and Load (ETL) Processes

### Data Integration

**Data integration** is the process of combining data from different sources into a unified, consistent view. It is the foundation upon which data warehousing is built.

Challenges of data integration include:

- **Schema heterogeneity** — Different systems use different data structures
- **Naming conflicts** — "Customer ID," "Cust_No," "client_id" all mean the same thing
- **Data type mismatches** — Dates stored as strings vs. date objects
- **Semantic differences** — "Revenue" may include or exclude tax depending on the source
- **Volume and velocity** — Integrating terabytes of data from dozens of systems within tight time windows

:::{admonition} Application Case 3.2 — BP Lubricants Achieves BIGS Success
:class: note
:icon: false

**BP Lubricants Achieves BIGS Success**

BP Lubricants, the global lubricants division of BP, faced a classic data integration challenge: sales data spread across dozens of legacy systems in multiple countries, each with different formats, currencies, and business rules.

By implementing a **Business Intelligence & Global Standards (BIGS)** initiative built on a centralized data warehouse, BP Lubricants was able to:

- Consolidate sales data from **40+ countries** into a single analytical platform
- Standardize product hierarchies and customer classifications globally
- Enable **cross-country sales analysis** that was previously impossible
- Reduce the time to produce regional sales reports from **weeks to hours**

The key success factor was investing heavily in the **ETL layer** — building robust transformation rules that could handle the complexity of global data standardization.
:::

### Extraction, Transformation, and Load

**ETL** is the core process that moves data from source systems into the data warehouse. Each phase plays a critical role:

:::{mermaid}
:label: fig-ch03-etl-flow

flowchart LR
    subgraph Sources
        S1[(CRM)]
        S2[(ERP)]
        S3[(Files)]
        S4[(APIs)]
    end

    subgraph "EXTRACT"
        E[Pull data from\nsource systems]
    end

    subgraph "TRANSFORM"
        T1[Clean & validate]
        T2[Standardize formats]
        T3[Apply business rules]
        T4[Derive calculated fields]
        T5[Deduplicate records]
    end

    subgraph "LOAD"
        L[Write to data\nwarehouse tables]
    end

    subgraph Warehouse
        DW[(Data Warehouse)]
    end

    S1 --> E
    S2 --> E
    S3 --> E
    S4 --> E
    E --> T1 --> T2 --> T3 --> T4 --> T5 --> L --> DW
:::

#### Extraction

The extraction phase pulls data from source systems. Methods include:

- **Full extraction** — Extract all data from the source each time (simple but expensive)
- **Incremental extraction** — Extract only data that has changed since the last load (efficient but requires change tracking)
- **Change Data Capture (CDC)** — Monitor database logs to detect changes in real-time

#### Transformation

Transformation is where the heavy lifting happens. Common transformations include:

:::{list-table} Common ETL Transformations
:label: tbl-etl-transforms
:header-rows: 1

* - Transformation
  - Description
  - Example
* - Data Cleansing
  - Fix errors, handle nulls, remove duplicates
  - Standardize "N.Y." → "New York"
* - Data Validation
  - Enforce rules and constraints
  - Reject orders with negative quantities
* - Format Standardization
  - Unify date formats, currency codes, units
  - "02/11/2026" and "2026-02-11" → ISO 8601
* - Aggregation
  - Summarize detail-level data
  - Daily sales → Monthly totals
* - Surrogate Key Assignment
  - Replace natural keys with warehouse keys
  - Customer #A-1234 → DW_ID 50001
* - Slowly Changing Dimensions
  - Track historical changes to dimension attributes
  - Customer address changes over time
* - Derived Calculations
  - Create new fields from existing data
  - Profit = Revenue − Cost
:::

#### Load

The load phase writes transformed data into the warehouse. Loading strategies include:

- **Initial Load** — The first complete population of the warehouse
- **Incremental Load** — Regular additions/updates (nightly, hourly, or near-real-time)
- **Full Refresh** — Truncate and reload entire tables (simple but slow)

:::{tip}
Modern cloud warehouses have popularized **ELT** (Extract, Load, *then* Transform) as an alternative to ETL. In ELT, raw data is loaded directly into the warehouse, and transformations happen inside the warehouse using SQL — leveraging the warehouse's massive compute power. Tools like **dbt** (data build tool) have made ELT a mainstream approach.
:::

---

## 3.6 Data Warehouse Development

Developing a data warehouse is a significant undertaking that requires careful planning, design, and execution.

:::{admonition} Application Case 3.3 — Teradata Analytics for SAP Solutions
:class: note
:icon: false

**Use of Teradata Analytics for SAP Solutions Accelerates Big Data Delivery**

A global manufacturing company struggled with the sheer volume of transactional data generated by its SAP ERP system. With billions of records across supply chain, finance, and production modules, generating analytical reports was painfully slow.

By implementing **Teradata** as their enterprise data warehouse platform integrated with SAP, the company achieved:

- **90% reduction** in report generation time for supply chain analytics
- Ability to process **3 billion+ rows** in complex aggregation queries
- **Near-real-time** inventory visibility across 200+ warehouses globally
- Self-service analytics for business users through Teradata's SQL-based interface

The critical lesson: choosing a warehouse platform that can **natively integrate** with your primary transactional system dramatically reduces ETL complexity and time-to-value.
:::

### Data Warehouse Development Approaches

There are two primary approaches to developing a data warehouse:

::::{tab-set}

:::{tab-item} Top-Down (Inmon)

**Start with the enterprise data warehouse, then build data marts.**

1. Conduct enterprise-wide requirements analysis
2. Design a normalized, 3NF enterprise data model
3. Build the centralized EDW
4. Derive department-specific data marts from the EDW

**Pros:**
- Single source of truth
- Strong data governance
- Consistent cross-departmental analysis

**Cons:**
- Long time to first deliverable (12–24 months)
- High upfront cost
- Requires strong executive sponsorship
:::

:::{tab-item} Bottom-Up (Kimball)

**Start with individual data marts, then integrate.**

1. Identify a high-value business process (e.g., sales)
2. Build a dimensional data mart for that process
3. Use **conformed dimensions** (shared definitions for customer, product, time)
4. Add more data marts incrementally
5. The collection of marts forms the "enterprise data warehouse"

**Pros:**
- Quick time to first deliverable (3–6 months)
- Lower initial cost
- Iterative, agile-friendly
- Business users see value early

**Cons:**
- Risk of inconsistency if dimensions aren't conformed
- Can become messy without discipline
:::

::::

### Additional Data Warehouse Development Considerations

When developing a data warehouse, also consider:

- **Data governance** — Who owns the data? Who defines business rules? Who approves changes?
- **Scalability planning** — How much data will you have in 1, 3, and 5 years?
- **Security and access control** — Role-based access, column-level security, data masking for sensitive fields
- **Data retention policies** — How long must you keep historical data? Regulatory requirements?
- **Disaster recovery** — Backup strategies, replication, failover

### Representation of Data in Data Warehouse

Data in a warehouse is typically organized using **dimensional modeling** — a technique designed for intuitive querying and high performance:

:::{prf:definition} Star Schema
:label: def-star-schema

A **star schema** organizes data into a central **fact table** (containing measures like sales amount, quantity) surrounded by **dimension tables** (describing the who, what, when, where). It is called a "star" because the diagram resembles a star shape.
:::

:::{prf:definition} Snowflake Schema
:label: def-snowflake-schema

A **snowflake schema** is a variation of the star schema where dimension tables are further **normalized** into sub-dimensions. For example, a "Location" dimension might be split into City → State → Country tables. This saves storage but adds query complexity.
:::

:::{mermaid}
:label: fig-ch03-star-schema

erDiagram
    FACT_SALES {
        int sale_id PK
        int product_key FK
        int customer_key FK
        int time_key FK
        int store_key FK
        float revenue
        int quantity
        float cost
    }
    DIM_PRODUCT {
        int product_key PK
        string product_name
        string category
        string brand
    }
    DIM_CUSTOMER {
        int customer_key PK
        string customer_name
        string segment
        string region
    }
    DIM_TIME {
        int time_key PK
        date full_date
        int month
        int quarter
        int year
    }
    DIM_STORE {
        int store_key PK
        string store_name
        string city
        string state
    }

    FACT_SALES ||--o{ DIM_PRODUCT : "product_key"
    FACT_SALES ||--o{ DIM_CUSTOMER : "customer_key"
    FACT_SALES ||--o{ DIM_TIME : "time_key"
    FACT_SALES ||--o{ DIM_STORE : "store_key"
:::

### Analysis of Data in Data Warehouse

Once data is in the warehouse, it can be analyzed through several methods:

- **SQL queries** — Ad-hoc analytical queries
- **OLAP (Online Analytical Processing)** — Multi-dimensional analysis
- **Reporting** — Scheduled and interactive reports
- **Data mining** — Discovering patterns and relationships
- **Dashboards** — Visual KPI monitoring
- **Machine learning** — Predictive and prescriptive models built on warehouse data

### OLAP versus OLTP

Understanding the difference between OLAP and OLTP is fundamental:

:::{list-table} OLAP vs. OLTP
:label: tbl-olap-vs-oltp
:header-rows: 1

* - Characteristic
  - OLTP
  - OLAP
* - Purpose
  - Day-to-day transactions
  - Analytical queries and reporting
* - Operations
  - INSERT, UPDATE, DELETE
  - SELECT (read-heavy)
* - Data Currency
  - Current data
  - Historical data
* - Response Time
  - Milliseconds
  - Seconds to minutes
* - Query Complexity
  - Simple, predefined
  - Complex, ad-hoc, multi-join
* - Users
  - Thousands (clerks, customers)
  - Dozens to hundreds (analysts, managers)
* - Data Volume per Query
  - Few rows
  - Millions of rows
* - Schema Design
  - Normalized (3NF)
  - Denormalized (star/snowflake)
* - Example
  - Process a sale
  - "Total revenue by region and quarter for the last 3 years"
:::

### OLAP Operations

OLAP enables users to interactively explore multi-dimensional data through several key operations:

:::{figure} ../images/ch03-olap-cube.png
:label: fig-ch03-olap-cube
:alt: A 3D OLAP cube visualization showing dimensions of Time, Product, and Geography with cells containing measure values
:width: 80%
:align: center

An OLAP cube with three dimensions — Time, Product, and Geography — containing sales measures at each intersection.
:::

::::{grid} 1 1 2 2

:::{card} 🔽 Drill-Down
Navigate from **higher-level** to **lower-level** data. Example: From yearly sales → quarterly → monthly → daily.
:::

:::{card} 🔼 Roll-Up
The opposite of drill-down. **Aggregate** data to a higher level. Example: From daily sales → monthly totals.
:::

:::{card} ✂️ Slice
Select a **single value** from one dimension, creating a cross-section. Example: View all sales for Q3 only.
:::

:::{card} 🎲 Dice
Select **multiple values** across multiple dimensions, creating a sub-cube. Example: Sales for Q3 and Q4 in the East region for Electronics only.
:::

:::{card} 🔄 Pivot (Rotate)
**Rearrange** the dimensions to see data from a different perspective. Example: Swap rows and columns — see products across the top and time down the side.
:::

::::

---

## 3.7 Data Warehousing Implementation Issues

Implementing a data warehouse is a complex endeavor. Common challenges include:

1. **Data Quality Issues**
   - Dirty, inconsistent, or incomplete source data
   - Missing values and conflicting records across systems
   - Solution: Invest heavily in data profiling and cleansing during ETL

2. **Scope Creep**
   - Starting too broad; trying to warehouse everything at once
   - Solution: Prioritize high-value subject areas; deliver iteratively

3. **Performance Problems**
   - Slow queries on large datasets; poor indexing strategies
   - Solution: Proper indexing, partitioning, materialized views, and query optimization

4. **User Adoption**
   - Building it but nobody uses it; analysts stick to spreadsheets
   - Solution: Involve end users early; provide training; build intuitive dashboards

5. **Political and Organizational Resistance**
   - Data ownership disputes; departments unwilling to share data
   - Solution: Executive sponsorship; clear data governance policies

6. **Cost Overruns**
   - Underestimating the complexity and ongoing maintenance costs
   - Solution: Start small (data marts), demonstrate ROI, then expand

### Massive Data Warehouses and Scalability

As organizations accumulate more data, scalability becomes critical. Modern approaches to scalability include:

- **Massively Parallel Processing (MPP)** — Distribute queries across many nodes (Teradata, Redshift, Snowflake)
- **Columnar Storage** — Store data by column rather than row for faster analytical scans
- **Data Compression** — Reduce storage costs and I/O bandwidth
- **Elastic Compute** — Cloud warehouses that can scale compute up/down independently of storage
- **Partitioning** — Divide large tables by date, region, or other keys for faster access

:::{admonition} Application Case 3.4 — EDW Helps Connect State Agencies in Michigan
:class: note
:icon: false

**EDW Helps Connect State Agencies in Michigan**

The State of Michigan faced a common government challenge: dozens of state agencies operating in silos, each with their own databases and reporting systems. Citizens interacting with multiple agencies (health services, education, workforce development) had no unified record.

Michigan implemented an **Enterprise Data Warehouse** to integrate data across agencies:

- **18 state agencies** connected to the EDW
- **Unified citizen view** linking records across health, education, and social services
- **$14 million in annual savings** from reduced duplicate services and fraud detection
- **Cross-agency analytics** enabling evidence-based policy decisions

The EDW became a critical tool for **pandemic response**, enabling the state to rapidly identify vulnerable populations by cross-referencing health, employment, and social services data.
:::

---

## 3.8 Data Warehouse Administration, Security Issues, and Future Trends

Administering a data warehouse involves ongoing activities:

- **Monitoring** — Track ETL job success/failure, query performance, storage usage
- **Optimization** — Tune queries, update statistics, rebuild indexes, manage partitions
- **Security** — Implement role-based access control (RBAC), column-level masking, audit logging
- **Backup & Recovery** — Regular backups, tested recovery procedures, disaster recovery planning
- **Change Management** — Manage schema changes, new data sources, and evolving business rules

:::{warning}
Data warehouses often contain the organization's most sensitive data — customer records, financial data, employee information. A security breach of the warehouse could be far more damaging than a breach of any single operational system because the warehouse consolidates data from everywhere.
:::

### The Future of Data Warehousing

The data warehousing landscape is evolving rapidly:

:::{list-table} Future Trends in Data Warehousing
:label: tbl-future-trends
:header-rows: 1

* - Trend
  - Description
  - Impact
* - **Cloud-First**
  - Migration from on-premise to cloud (Snowflake, BigQuery, Redshift, Databricks)
  - Lower TCO, elastic scaling, pay-per-use
* - **Real-Time Warehousing**
  - Streaming data integration replacing batch ETL
  - Minutes-old data instead of day-old data
* - **Data Lakehouse**
  - Convergence of data lakes and warehouses
  - Unified platform for structured and unstructured data
* - **AI-Augmented Warehousing**
  - Automated data modeling, anomaly detection, query optimization using ML
  - Self-tuning, self-healing warehouse infrastructure
* - **Data Mesh**
  - Decentralized, domain-driven data ownership
  - Federated governance, domain-specific data products
* - **Zero-Copy Data Sharing**
  - Share live data between organizations without copying
  - Faster partner analytics, marketplace data exchange
* - **Semantic Layers**
  - Business-friendly metric definitions on top of the warehouse
  - Consistent metrics regardless of the BI tool used
:::

---

## 3.9 Business Performance Management

**Business Performance Management (BPM)** is a set of management and analytic processes that enable the management of an organization's performance to achieve one or more preselected goals.

BPM encompasses:
- **Methodologies** — Balanced Scorecards, Six Sigma, benchmarking
- **Technologies** — BI platforms, dashboards, scorecards, planning tools
- **Processes** — Goal setting, monitoring, analyzing, adjusting

### Closed-Loop BPM Cycle

The BPM process follows a **closed-loop cycle** that connects strategy to execution to optimization:

:::{mermaid}
:label: fig-ch03-bpm-cycle

flowchart TD
    A["1. STRATEGIZE\nDefine vision, mission,\nobjectives, strategy maps"] --> B["2. PLAN\nSet targets, budgets,\nforecasts, resource allocation"]
    B --> C["3. MONITOR\nTrack KPIs, dashboards,\nscorecard performance"]
    C --> D["4. ANALYZE\nRoot cause analysis,\nvariance analysis, what-if"]
    D --> E["5. ACT/ADJUST\nCorrective actions,\nprocess improvements"]
    E --> A

    style A fill:#2c3e50,color:#fff
    style B fill:#2980b9,color:#fff
    style C fill:#27ae60,color:#fff
    style D fill:#f39c12,color:#fff
    style E fill:#c0392b,color:#fff
:::

1. **Strategize** — Define the organization's vision, mission, and strategic objectives. Create strategy maps that link objectives across perspectives.

2. **Plan** — Translate strategy into operational plans. Set targets, allocate budgets, create forecasts.

3. **Monitor** — Track actual performance against targets using KPIs, dashboards, and scorecards. Identify deviations early.

4. **Analyze** — When performance deviates from plan, conduct root-cause analysis. Use drill-down, variance analysis, and what-if scenarios to understand why.

5. **Act/Adjust** — Take corrective action based on analysis. Adjust plans, reallocate resources, or modify strategy. Feed learnings back into the next planning cycle.

:::{important}
The key word is **closed-loop**. BPM is not a one-time exercise — it is a continuous cycle of setting goals, measuring progress, identifying gaps, and taking action. The data warehouse and BI tools provide the analytical engine that powers this cycle.
:::

:::{admonition} Application Case 3.5 — AARP Transforms Its BI Infrastructure
:class: note
:icon: false

**AARP Transforms Its BI Infrastructure and Achieves a 347% ROI in Three Years**

AARP, the 38-million-member nonprofit organization serving Americans over 50, faced a fragmented BI landscape with multiple disconnected reporting systems. Different departments used different tools and definitions, making organization-wide performance measurement nearly impossible.

AARP's transformation involved:

- **Consolidating 15+ BI tools** into a single, unified BI platform
- **Building an enterprise data warehouse** as the single source of truth
- **Implementing a BPM framework** with standardized KPIs across all divisions
- **Creating self-service dashboards** that reduced report turnaround from weeks to minutes

Results after three years:
- **347% ROI** on the BI transformation investment
- **80% reduction** in time spent creating reports
- **90% increase** in the number of data-driven decisions
- Cross-functional visibility that enabled **better member engagement strategies**
:::

---

## 3.10 Performance Measurement

Effective performance management requires effective **performance measurement** — the systematic process of collecting, analyzing, and reporting data about organizational performance.

### Key Performance Indicator (KPI)

:::{prf:definition} Key Performance Indicator (KPI)
:label: def-kpi

A **Key Performance Indicator** is a measurable value that demonstrates how effectively an organization is achieving key business objectives. KPIs are used at multiple levels to evaluate success at reaching targets.
:::

Characteristics of effective KPIs:

::::{grid} 1 1 2 3

:::{card} 📏 Specific
Clearly defined with no ambiguity. Everyone interprets it the same way.
:::

:::{card} 📊 Measurable
Quantifiable with available data. If you can't measure it, it's not a KPI.
:::

:::{card} 🎯 Actionable
Linked to actions that can influence the outcome. Stakeholders know what levers to pull.
:::

:::{card} 📈 Relevant
Aligned with strategic objectives. Not just an interesting metric — a *meaningful* one.
:::

:::{card} ⏰ Time-Bound
Measured over a defined period with clear reporting frequency.
:::

::::

:::{list-table} Example KPIs by Business Function
:label: tbl-kpi-examples
:header-rows: 1

* - Function
  - KPI
  - Typical Target
* - Sales
  - Revenue growth rate
  - 15% year-over-year
* - Marketing
  - Customer acquisition cost (CAC)
  - < $50 per customer
* - Operations
  - Order fulfillment cycle time
  - < 48 hours
* - Finance
  - Operating profit margin
  - > 20%
* - Customer Service
  - Net Promoter Score (NPS)
  - > 70
* - HR
  - Employee turnover rate
  - < 10% annually
* - IT
  - System uptime
  - 99.9%
:::

### Performance Measurement System

A **performance measurement system** is the integrated set of KPIs, targets, data collection methods, and reporting tools that an organization uses to monitor its performance. Key components include:

- **KPI catalog** — A centralized repository of all KPIs, their definitions, owners, and targets
- **Data collection** — Automated feeds from operational systems into the data warehouse
- **Dashboards and scorecards** — Visual interfaces for monitoring KPIs
- **Alerting** — Automated notifications when KPIs cross threshold boundaries
- **Analysis tools** — Drill-down, root-cause analysis, trend analysis capabilities

---

## 3.11 Balanced Scorecards

The **Balanced Scorecard (BSC)** is a strategic planning and management framework developed by **Robert Kaplan and David Norton** in the early 1990s. It translates an organization's vision and strategy into a coherent set of performance measures organized across four perspectives.

:::{figure} ../images/ch03-balanced-scorecard.png
:label: fig-ch03-bsc
:alt: The four perspectives of the Balanced Scorecard framework showing Financial, Customer, Internal Process, and Learning and Growth perspectives connected to strategy at the center
:width: 85%
:align: center

The Balanced Scorecard organizes strategic objectives and KPIs across four interconnected perspectives.
:::

### The Four Perspectives

::::{tab-set}

:::{tab-item} 💰 Financial

**"How do we look to shareholders?"**

Financial metrics measure the economic outcomes of the strategy. They answer whether the organization's strategy, implementation, and execution are contributing to bottom-line improvement.

Example objectives and KPIs:
- Increase revenue growth → Revenue growth rate
- Improve profitability → Operating margin, ROI
- Optimize cost structure → Cost per unit, overhead ratio
- Maximize asset utilization → Return on assets (ROA)
:::

:::{tab-item} 👥 Customer

**"How do customers see us?"**

Customer metrics focus on target market segments and the value proposition. They measure how well the organization delivers value to its customers.

Example objectives and KPIs:
- Increase customer satisfaction → CSAT score, NPS
- Grow market share → Market share percentage
- Improve customer retention → Churn rate, renewal rate
- Enhance brand perception → Brand awareness, sentiment score
:::

:::{tab-item} ⚙️ Internal Business Process

**"What must we excel at?"**

Internal process metrics identify the critical processes that the organization must perform well to satisfy customers and shareholders.

Example objectives and KPIs:
- Improve operational efficiency → Cycle time, defect rate
- Accelerate innovation → Time to market, R&D spend ratio
- Strengthen supply chain → On-time delivery rate
- Enhance quality → Six Sigma level, warranty claims
:::

:::{tab-item} 📚 Learning & Growth

**"Can we continue to improve and create value?"**

Learning and growth metrics address the intangible assets — human capital, information capital, and organizational culture — that are the ultimate foundation of strategy.

Example objectives and KPIs:
- Develop workforce skills → Training hours per employee, certification rate
- Foster innovation culture → Employee suggestions implemented
- Improve IT capabilities → System availability, data quality score
- Enhance employee engagement → Engagement survey scores, turnover rate
:::

::::

### The Meaning of Balance in BSC

The word "balanced" in Balanced Scorecard refers to several types of balance:

1. **Financial vs. Non-Financial** — Not just profit; also customer satisfaction, process quality, and learning
2. **Leading vs. Lagging Indicators** — Lagging (financial results) and leading (process improvements that drive future results)
3. **Internal vs. External** — Internal processes alongside external customer and shareholder perspectives
4. **Short-Term vs. Long-Term** — Immediate financial returns balanced with long-term capability building

---

## 3.12 Six Sigma as a Performance Measurement System

**Six Sigma** is a disciplined, data-driven approach for eliminating defects and improving processes. Originally developed at **Motorola** in the 1980s and popularized by **General Electric** under Jack Welch, Six Sigma uses statistical methods to measure and improve operational performance.

:::{prf:definition} Six Sigma
:label: def-six-sigma

**Six Sigma** refers to a statistical measure where a process produces no more than **3.4 defects per million opportunities** (DPMO). The term "sigma" (σ) represents standard deviations from the mean in a normal distribution. Six sigma means the nearest specification limit is six standard deviations from the process mean.
:::

| Sigma Level | DPMO | Yield |
|:-----------:|:----:|:-----:|
| 1σ | 691,462 | 30.85% |
| 2σ | 308,538 | 69.15% |
| 3σ | 66,807 | 93.32% |
| 4σ | 6,210 | 99.38% |
| 5σ | 233 | 99.977% |
| **6σ** | **3.4** | **99.9997%** |

### The DMAIC Performance Model

The DMAIC model is the core methodology of Six Sigma for improving existing processes:

:::{mermaid}
:label: fig-ch03-dmaic

flowchart LR
    D["**DEFINE**\nProblem statement\nProject scope\nVoice of customer"] --> M["**MEASURE**\nCurrent performance\nData collection plan\nProcess capability"]
    M --> A["**ANALYZE**\nRoot cause analysis\nStatistical analysis\nHypothesis testing"]
    A --> I["**IMPROVE**\nSolution design\nPilot testing\nImplementation"]
    I --> C["**CONTROL**\nControl charts\nStandard procedures\nSustain improvements"]

    style D fill:#e74c3c,color:#fff
    style M fill:#f39c12,color:#fff
    style A fill:#3498db,color:#fff
    style I fill:#2ecc71,color:#fff
    style C fill:#9b59b6,color:#fff
:::

### Balanced Scorecard versus Six Sigma

While both BSC and Six Sigma aim to improve organizational performance, they serve different purposes:

:::{list-table} BSC vs. Six Sigma
:label: tbl-bsc-vs-sigma
:header-rows: 1

* - Dimension
  - Balanced Scorecard
  - Six Sigma
* - Focus
  - Strategic alignment and measurement
  - Process improvement and defect reduction
* - Level
  - Organization-wide
  - Process-level
* - Approach
  - Top-down (strategy → metrics)
  - Bottom-up (process data → improvements)
* - Primary Tools
  - Strategy maps, scorecards, dashboards
  - Statistical analysis, control charts, DMAIC
* - Time Horizon
  - Long-term strategic
  - Project-based (3–6 months per project)
* - Key Question
  - "Are we executing our strategy?"
  - "Are our processes performing optimally?"
:::

:::{tip}
BSC and Six Sigma are **complementary**, not competing. Many organizations use the **Balanced Scorecard** to define *what* to measure and *why*, and **Six Sigma** projects to improve the *how*. When a BSC reveals an underperforming KPI, a Six Sigma project can be launched to investigate and fix the underlying process.
:::

### Effective Performance Measurement

For performance measurement to drive real improvement, organizations should:

1. **Align metrics to strategy** — Every KPI should trace back to a strategic objective
2. **Limit the number of KPIs** — Focus on 15–25 organization-level KPIs; too many creates noise
3. **Mix leading and lagging indicators** — Lagging tells you what happened; leading tells you what *will* happen
4. **Set meaningful targets** — Based on benchmarks, historical trends, and strategic aspirations
5. **Review regularly** — Monthly operational reviews, quarterly strategic reviews
6. **Act on the data** — The biggest failure in performance measurement is measuring but not acting

:::{admonition} Application Case 3.6 — Expedia.com's Customer Satisfaction Scorecard
:class: note
:icon: false

**Expedia.com's Customer Satisfaction Scorecard**

Expedia, one of the world's largest online travel companies, implemented a **customer satisfaction scorecard** to systematically track and improve the customer experience across its digital platforms.

Key elements of Expedia's scorecard:

- **Customer effort score (CES)** — How easy is it to complete a booking?
- **First contact resolution (FCR)** — Was the customer's issue resolved on the first call?
- **Booking abandonment rate** — At which step do customers drop off?
- **Post-trip satisfaction** — Overall experience rating after travel completion
- **Response time SLA compliance** — Percentage of inquiries answered within the target window

By tracking these KPIs on a **real-time dashboard** powered by their data warehouse, Expedia could:
- Identify and fix UX issues within hours of detection
- Correlate customer satisfaction metrics with revenue outcomes
- Prioritize engineering improvements based on customer impact
- Set team-level and individual-level performance targets tied to customer outcomes
:::

---

## Chapter Highlights

:::{admonition} Key Takeaways
:class: important

- A **data warehouse** is a subject-oriented, integrated, time-variant, and nonvolatile data repository designed for analytical querying
- **Data marts** provide focused, department-level subsets of the warehouse
- The **ETL process** (Extract, Transform, Load) is the backbone of data warehousing, moving and cleaning data from source systems
- Modern alternatives include **ELT**, **cloud data warehouses**, and **data lakehouses**
- **OLAP** enables multi-dimensional analysis with operations like drill-down, roll-up, slice, dice, and pivot
- The **Inmon (top-down)** and **Kimball (bottom-up)** approaches represent two philosophies for warehouse design
- **Business Performance Management** follows a closed-loop cycle: Strategize → Plan → Monitor → Analyze → Act
- **KPIs** must be specific, measurable, actionable, relevant, and time-bound
- The **Balanced Scorecard** organizes strategy across four perspectives: Financial, Customer, Internal Process, and Learning & Growth
- **Six Sigma** uses the **DMAIC** methodology to improve processes toward near-zero defects
- BSC and Six Sigma are **complementary** — BSC defines what to measure; Six Sigma improves the underlying processes
:::

---

## Key Terms

:::{glossary}
Business Intelligence (BI)
  Strategies, technologies, and practices for collecting, integrating, analyzing, and presenting business data to support decision-making.

Data Warehouse
  A subject-oriented, integrated, time-variant, and nonvolatile collection of data for analytical decision support.

Data Mart
  A subset of a data warehouse focused on a specific business area or department.

ETL (Extract, Transform, Load)
  The process of extracting data from source systems, transforming it into the warehouse format, and loading it into the warehouse.

ELT (Extract, Load, Transform)
  A modern variant where raw data is loaded first, then transformed inside the warehouse.

OLAP (Online Analytical Processing)
  Technology that enables multi-dimensional analysis of data from multiple perspectives.

OLTP (Online Transaction Processing)
  Technology optimized for managing transaction-oriented applications.

Star Schema
  A data warehouse schema with a central fact table connected to denormalized dimension tables.

Snowflake Schema
  A normalized variant of the star schema where dimensions are further decomposed.

Metadata
  Data about data — describing source, format, meaning, and lineage of warehouse data.

KPI (Key Performance Indicator)
  A measurable value demonstrating how effectively an organization achieves key objectives.

Balanced Scorecard (BSC)
  A strategic management framework measuring performance across Financial, Customer, Internal Process, and Learning & Growth perspectives.

Six Sigma
  A data-driven methodology for eliminating defects, targeting 3.4 defects per million opportunities.

DMAIC
  Define, Measure, Analyze, Improve, Control — the core Six Sigma methodology.

Business Performance Management (BPM)
  The set of processes enabling management of organizational performance toward preselected goals.

Operational Data Store (ODS)
  A database providing current or near-current integrated data for operational reporting.

Enterprise Data Warehouse (EDW)
  A centralized warehouse serving the entire organization as a single source of truth.

Change Data Capture (CDC)
  A technique for detecting and capturing changes in source data for incremental warehouse loading.

Data Lakehouse
  A hybrid architecture combining the flexibility of a data lake with the governance of a data warehouse.
:::

---

## Questions for Discussion

1. What are the key differences between a data warehouse and a transactional database? Why can't organizations simply run analytical queries against their operational databases?

2. Compare and contrast the Inmon (top-down) and Kimball (bottom-up) approaches to data warehouse development. Under what circumstances would you recommend each?

3. Why is metadata considered "the most important component" of a data warehouse by some practitioners? What happens when metadata is poorly managed?

4. Explain the difference between ETL and ELT. Why has ELT become more popular with the rise of cloud data warehouses?

5. A company is experiencing rapid growth and their current data warehouse can't keep up. What architectural changes would you recommend?

6. How does the Balanced Scorecard address the limitations of purely financial performance measurement?

7. Explain how Six Sigma and Balanced Scorecard can work together. Provide a specific example.

8. Why is the "closed-loop" aspect of BPM critical? What happens when organizations measure performance but don't close the loop?

---

## Exercises

:::{exercise} Data Warehouse Design
:label: ex-ch03-dw-design

You are the data warehouse architect for a mid-size retail company with 200 stores, an e-commerce platform, and a mobile app. The company currently has:
- A POS (point-of-sale) system tracking in-store transactions
- An e-commerce platform (Shopify) tracking online orders
- A CRM system (Salesforce) tracking customer interactions
- A supply chain system tracking inventory and shipments

Design a star schema for a **Sales Analysis** data mart. Identify:
a) The fact table and its measures
b) At least 4 dimension tables and their key attributes
c) The grain (level of detail) of the fact table
d) Two example analytical queries this schema would support
:::

:::{exercise} ETL Challenge
:label: ex-ch03-etl

A healthcare organization is building a data warehouse that integrates data from three hospitals, each with its own patient record system. The key challenges are:
- Patient IDs are different across hospitals (Hospital A uses SSN, Hospital B uses medical record numbers, Hospital C uses auto-generated IDs)
- Date formats vary (MM/DD/YYYY vs. YYYY-MM-DD vs. DD-MON-YY)
- Diagnosis codes use different versions (ICD-9 vs. ICD-10)

Describe the ETL process you would design to handle these challenges. Address extraction, each transformation step, and the loading strategy.
:::

:::{exercise} Balanced Scorecard Application
:label: ex-ch03-bsc

Develop a Balanced Scorecard for a **university** (like FAU, MDC, or PBA). For each of the four perspectives, define:
a) Two strategic objectives
b) One KPI for each objective
c) A target for each KPI
d) One strategic initiative to drive improvement

Consider what "Financial" means for a university (enrollment, funding), who the "Customers" are (students, employers, community), which "Internal Processes" matter most (teaching, research, administration), and what "Learning & Growth" looks like (faculty development, technology infrastructure).
:::

:::{exercise} Six Sigma Application
:label: ex-ch03-sigma

An e-commerce company receives an average of 50,000 orders per day. Currently, 1.5% of orders are shipped with errors (wrong item, wrong quantity, or wrong address). The company wants to achieve a Four Sigma level of quality.

a) How many defective orders per day does the company currently ship?
b) What DPMO does this represent?
c) At Four Sigma (6,210 DPMO), how many defective orders per day would be acceptable?
d) Outline a DMAIC approach to achieve this improvement.
:::
