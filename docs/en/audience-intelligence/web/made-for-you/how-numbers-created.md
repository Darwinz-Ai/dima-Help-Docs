---
label: How The Numbers Are Counted
description: >-
  Learn how to build, edit, customize, filter, share, and manage custom dashboards in the Made For You module.
order: 1
readingTime: 4
---

# Understanding Your Chart Metrics

To get the most out of your Made For You charts, it helps to know exactly how your data is calculated.

This guide outlines the exact rules used to calculate the metrics in your charts. We cover what goes into each total, what is left out, and why overlapping charts sometimes yield different results.

Knowing these parameters allows you to use your reporting features more effectively, understand the exact scope of the data, and help you build better charts.

---

## 1. The Four Layers of Chart Filtering

To give you the most accurate insights, every chart refines your data through four sequential steps before generating a final number:

### The Dashboard's Companies

The chart only pulls data for the companies assigned to its specific dashboard.

### The Date Range

The chart follows the dashboard's date range, unless you have configured a custom date range for that specific chart (see Section 7).

### Active & Relevant Content

The charts only count data that is relevant to your monitoring.

- **For social posts and conversation**: this means content dima identified as relevant that you haven't deleted
- **For Google reviews**: it covers your currently tracked locations (See how to track locations).

Because this standard applies to everything, it ensures consistency across your entire dashboard.

### Applied Filters

The charts applies both its own specific filters and your dashboard-wide filters. Data must satisfy **_*all*_** applicable conditions to be counted.

Note: If a dashboard filter doesn't match a chart's data source (like applying a star-rating filter to a social post), the chart simply ignores it and remains unchanged.

---

## 2. How Social Posts Are Counted

The golden rule for analyzing social data in your charts is simple: **a post is counted per company, while a person is counted once.**

### Posts monitored by more than one company

Let's say Company A and Company B both track the same account, a single post from that account is captured once for Company A and once for Company B. If you view a chart covering both companies, that post is counted twice. This happens by design.

Why? Because it allows you to customize your data. Each company might apply its own unique labels or topics to that exact same post. Keeping those records separate means your custom labels stay intact, and your individual company metrics will always add up flawlessly to your grand totals.

Keep this structural rule in mind when analyzing high-level volume across a dashboard with overlapping companies.

### Authors, Own Pages and Follower Counts

While posts are counted per company, authors, own pages and groups are strictly counted once across your entire dashboard.

For example, if an account has 100,000 followers and is tracked by both Company A and Company B, a chart covering both companies will report exactly 100,000 followers, not 200,000. Because this represents a single audience, deduplicating this metric prevents your chart from reporting artificially inflated reach.

As you analyze multi-company dashboards, keep this distinction in mind: your post volumes will scale to reflect overlapping coverage, while your author and audience totals will always reflect the true, unique number of people reached.

### Calculating Engagement

Your engagement metric is a straightforward sum of four active interactions: likes, comments, shares and saves. A post with 10 likes, 4 comments, 2 shares and 1 save simply equals 17 engagement.

Note: Views are intentionally excluded from this calculation and are provided as a separate metric, allowing you to clearly distinguish passive reach from active audience interaction.

### Page and Group Metrics

Your charts automatically categorizes posts into mutually exclusive "buckets". Own Page metrics exclusively track posts from own pages, and Group metrics only track posts within groups. These categories never overlap.

Everything else is considered a standard post. So, if a chart displays 40 total posts, consisting of 12 page posts and 5 group posts, the math is perfectly consistent: the remaining 23 are simply standard posts.

Note: When tracking a group's reach, the "follower" metric simply represents the group's total member count.

### Managing Company-Specific Labels

To keep your reporting customizable, labels belong strictly to the company that applies them. If multiple companies monitor the same post, tagging it in one company's dashboard won't overwrite or affect the others.

Because labels are isolated in this way, you can trust your "No Label" category. A post lands there only if your company hasn't labeled it, meaning you never have to guess whether another company's actions are influencing your charts.

### Why Chart Totals and Monitoring Screens Differ

You may occasionally notice that the post count on your Made For You charts is slightly higher than the count on your Monitoring screens for the exact same date range. This happens because the two features filter data differently:

- Monitoring Screens only display a post if the author's full account profile has been successfully captured and recorded in the system.

- Made For You Charts prioritize total volume, counting every relevant post whether the author's full profile is on record or not.

Both numbers are accurated based on their specific criteria. To keep your external reporting consistent, we recommend choosing one tool (either your charts or your monitoring feed) and using it as your single source of truth for post volume.

---

## 3. How Google Reviews Are Counted

Reviews follow the same per-company principle as posts, and add one rule of their own
about how star ratings become sentiment.

Google reviews follow the same per-company counting rules as social posts, with one additional guideline for how star ratings are converted into sentiment.

### Locations Shared by More Than One Company

A physical location can be linked to more than one of your companies. A review of
that location is counted once for each company it belongs to. (Need clarification)

If a branch is shared by Company A and Company B and has 100 reviews, a dashboard
covering both companies reports 200. Broken down by company, each shows 100. As with
posts, this is what keeps a breakdown consistent with its total.

A physical location can be linked to more than one of your companies. When this occurs, a review of that location is counted once for every company it belongs to.

If a shared branch has 100 reviews and is tracked by both Company A and Company B, a dashboard covering both companies will report 200 reviews. When broken down by company, each will individually show 100. Just as with posts, this method is exactly what keeps your company-level reporting perfectly consistent with your overall chart totals.

### Selecting Your Locations

Your charts automatically focus on the locations you currently monitor. The location picker applies this exact same rule, ensuring it never offers a location that your charts would exclude.

### How Star Ratings Map to Sentiment

A Google review carries no separate sentiment. It is read from the star rating:

Because Google reviews don't come with built-in sentiment tags, the system automatically translates the star rating into a sentiment category for you:

| Stars | Sentiment |
| ----- | --------- |
| 4-5   | Positive  |
| 3     | Neutral   |
| 1-2   | Negative  |

This rule powers your sentiment filters, sentiment breakdowns, and NPS scores. Because all three uses this same scale, your metrics will never conflict.

For instance, filtering your dashboard to "Positive" and grouping a chart by sentiment will always select the exact same reviews.

### Sub-Rating Categories

Google allows customers to leave highly specific sub-ratings on their reviews, but these data points do not all use the same measurement scale. While categories like Service and Food use a 1-to-5 star rating, others are purly numerical such as Wait Time (in minutes) and Group Size (number of people).

Because these metrics use entirely different scales, averaging them together across your entire dashboard, such as combining 5-star rating, a 12-minute wait and a party of 3, will result in a distorted, unusable number.

#### Best Practice for Meaningful Data:

To solve this, simply group your chart by sub-rating category, or apply a filter to view just one category at a time. When you filter down to a single metric, the system completely removes the others from calculation, giving you a clean, precise average for that specific category.

### How Topics Are Filtered

To keep your data exploration efficient, your topic filters use two built-in safeguards:

- **Active Topics Only:** The topic picker intelligently displays only the topics currently applied to your reviews.

- **Smart Capitalization Grouping:** To prevent fragmented reporting, the system automatically merges topics that differ only by capitalization (e.g. "iPhone" and "iphone")

---

## 4. How Product Reviews Are Counted

Product reviews are your most straightforward data source. Because one review always equals one product, and one product belongs strictly to one company, there is zero duplicate counting. The total number on your chart is the exact number of unique reviews you have received.

When analyzing product reviews, keep these three categorization rules in mind:

- **Consistent Sentiment:** We apply the same star-rating scale here as we do for Google Reviews (See How Star Ratings Map to Sentiment section).

- **Marketplace Platforms:** The "Platform" label tells you where a review was published (e.g. Amazon, Noon) so you can track specific marketplace trends.

- **Verified Purchase Insights:** You can use the "Verified Purchase" metric in two ways:
  - As a category to split your charts
  - As a sum to measure how many reviews came from confirmed buyers

---

## 5. Conversations

Conversation charts are specifically designed to measure replies. The most powerful tool you have to control these charts is your date range setting, which completely changes the scope of your data depending on how you anchor it.

### Anchoring Your Date Range: Replies vs. Posts

You can choose to anchor your conversation data to either the date of the reply or the date of the original post:

- **Reply-Anchored (Audience Activity):** The date range filters for replies that arrived exactly within your chosen timeframe. The original posts are simply pulled in to give those replies context. **Use this to answer:\***"What was my audience saying during the month of May?"\*

- **Post-Anchored (Campaign Performance):** The date range filters for posts that were published within your chosen timeframe. It then pulls in every single reply those posts ever received, regardless of when the replies were actually posted. **Use this to answer:\***"How did my May campaign perform overall?"\*

#### How this looks in practice:

Imagine you publish a post on May 20th, and it continues getting replies through June 30th.

- If your chart is **Post-Anchored** for May, it will include the June replies because the parent post belongs to May. When you group this chart by date, all these replies will visually stack under May.

- If your chart is **Reply-Anchored** for May, it will strictly count the replies that occurred in May, leaving the June replies out. When you group this chart by date, the data will be organized by the specific month the replies were written.

### Post Metrics in Conversation Charts

When looking at conversation charts, you never have to worry about your parent post data skewing your results. Even if a post has 40 replies, the post's individual likes, views, and total engagement are counted exactly once.

This built-in rule ensures your high-level post metrics stay completely grounded, rather than being multiplied by a busy comment section.

---

## 6. Sentiment, NPS and Percentages

### Understanding Your NPS Score

Your Net Promoter Score (NPS) actively measures audience sentiment on a standard index from -100 to +100. The system calculates this by subtracting the percentage of negative feedback from the positive:

$$\text{NPS} = \left( \frac{\text{Positive} - \text{Negative}}{\text{Records with Sentiment}} \right) \times 100$$

Note: NPS uses records with a designated sentiment. Any record missing a sentiment tag is ignored entirely. This ensures your score reflects real opinions rather than empty data points.

For instance, if you have 100 posts but 40 lack sentiment, your NPS is calculated cleanly from the remaining 60.

Because of this targeted calculation, your NPS will not match the total post or reply count displayed next to it. They are measuring two different things: total volume vs active sentiment.

Lastly, because NPS is a standalone index score that can drop below zero, it does not display a traditional "percentage-of-total" value to avoid misleading data.

### Reading Your Percentages

When you look at a chart with multiple layers (e.g. Stacked Bar chart), percentages show you the breakdown _within that specific category_, not the entire chart.

For example, if you split your platforms by sentiment: Instagram's positive, neutral and negative shares will total 100% on their own. This design lets you instantly understand your performance on a single channel without having to do extra math.

If you ever want a percentage that represents your entire data set as a whole, simply refer to a scorecard or a chart with a single breakdown (e.g. Pie chart)

---

## 7. Handling Dates, Weeks, and Time Zones

### Localized Time Zones

Everything in your charts operates on your account's designated time zone. Because your selected date ranges, chart visualizations, and post timestamps all share this exact same timeframe, you never have to worry about data slipping into the wrong day.

### How Weeks Are Calculated

To keep your reporting clean, weeks always begin on Sunday, and a single week is never split across two different years. The official year a week belogns to is always determined by its final day (Saturday).

**For instance:** The week beginning on Sunday, December 28th, 2025, ends on Saturday 3rd, 2026. Because the Saturday falls in 2026, that entire week is categorized as the first week of 2026.

This keeps your data grouped logically, meaning a post from December 28th and a post from January 1st will sit perfectly together in the same weekly bar.

### Year-Over-Year Grouping

If you use the "Week of Year" grouping, the system intentionally merges the data from the exact same calendar week across multiple years into a single bar.

This specific view is designed to help you easily spot seasonal trends and analyze year-over-year performance.

### Visualizing Inactive Periods

Your charts are designed to highlight action, not empty space. If a day or week has nom atching records, the chart simply skips it instead of plotting an empty bar.

This means your time series acts as a timeline of actual content, so any gaps you see are a direct indicator of zero activity.

### Overriding Dashboard Date Ranges

You can lock individual charts to specific timeframes, allowing you to mix and match date ranges across a single dashboard:

| Setting          | What the chart covers                                   |
| ---------------- | ------------------------------------------------------- |
| Default          | The dashboard's standard range                          |
| Fixed            | Custom dates saved directly to the chart                |
| Period on period | The selected window and the equal timeframe prior to it |
| Year to date     | Jan 1 of the selected year to end date                  |
| Month to date    | The 1st of the selected month to the end date           |
| Last 30          | The 30 days before the end date                         |

The **Period on Period** setting deserves particular attention because it expands your date window rather than simply shifting it.

For example, if your dashboard is set to 1-31 May, a period-on-period chart will actually cover 1 April to 31 May. Consequently, its overall totals will be correspondingly larger than those of a chart using the default range.

---

## 8. Managing Limits and the "Other" Bar

Setting a limit on your chart gives you complete control over your top-performing data. The chart selects your top values, and you decide what happens to the rest: drop them completely or roll them into a single "Other" bar.

### Selecting Your Top Data

To determine which values make the cut, the chart applies the first of these three rules that fits:

1. **Your Sort Settings:** It follows any metric sort you apply.

2. **Date Order:** For date breakdowns, it organizes from oldest to newest.

3. **Largest First:** By default, it ranks by your first metric to show the higest volume.

   If two items tie, they are sorted alphabetically/numerically so your chart remains perfectly stable every time you load it.

### How The "Other" Bar Works

The "Other" bar doesn't just hide data; it keeps your analytics pristine.

- It recalculates directly from the raw data. This ensures your unique count (like total authors) and averages never get inflated.

- It says neatly at the end of your chart.

- It adapts to nested limits. For instance: If you look at Top 3 Days inside Top 5 Platforms, Facebook gets its own specific "Other" bar just for Facebook data.

- If applies to dates, it smartly gathers all unlisted days into one bar. Click it, and you will see exactly the records from those specific missing days.

---

## 9. Drilling Down into Your Chart Data

For social post charts, you can click directly on any bar to open a detailed list of the underlying posts. (This capability will expand to Google reviews, product reviews, and conversations in the future).

### What You See Is Exactly What Was Counted

When you open a bar, the system provides a perfect 1-to-1 match of the data that generated that specific number. The detailed view inherits every single filter, rule, and date constraint applied to the chart.

If the bar counted 50 posts, you will see exactly those 50 posts; meaning you never have to guess where a metric came from.

### How It Handles Edge Dates

This precision is especially helpful for weekly bars sitting at the very edge of your date range. For instance, if your date range begins on Thursday, May 1st, the visual bar represents that week, but it only counted data from May 1st onward.

When you click to open that bar, it will exclusively show you the posts from those specific in-range days, rather than forcing you to sift through the entire calendar week.

---

## 10. Word clouds

Your word clouds automatically filter out the noise so you can instantly spot the most important themes in your data.

### How Words Are Weighed and Filtered

- **Reach over Repetition:** A word is counted exactly once per post, review or reply, even if the author repeats it ten times. This means the size of a word reflects how many unique pieces of content mention it.

- **Top Results:** Each cloud distinctly displays your top 50 words alongside your top 50 hashtags.

- **Smart Filtration:** To keep your data clean, the system automatically removes links, @mentions, punctuation, single characters, numbers, and common stop words (e.g. "the" or "في"). Arabic spelling variants are also automatically merged to consolidate your data.

- **Language Focus:** Clouds support English and Arabic Text. Scripts outside these parameters (such as Cyrillic, Chinese, or accented French) are excluded, which keeps your bilingual data pristine.

- **Contextual Noise Reduction:** For social posts and conversations, your monitored account names and topics are excluded so they don't crowd out organic audience keywords.
  Note: For reviews, topic words are intentionally kept, as they represent the core findings of the feedback.

- **Audience Voice:** Conversation clouds are built exclusively from replies, ensuring you see what your audience is saying rather than what your account published.

---

## 11. AI insights

Your AI insights are built to provide qualitative themes rather than quantitative totals. To deliver clear, high-level summaries, the AI samples a curated selection of your records rather than processing every individual data point.

- **Context over Volume:** The AI references a smaller subset of records to find broader trends, so its cited numbers will naturally be lower than your chart's grand total.

- **Text is Required:** The AI automatically bypasses empty records, like standard reposts or textless images, because there is nothing for it to summarize.
  Note: While these are excluded from the qualitative AI insight, your chart will always maintain your true quantitative total.

---

## 12. Getting the Most Out of Filters

Before building a chart with filters, it's important to understand a few key behaviors that affect how filters work. To build the most effective charts, keep these core behaviors in mind:

- **The "Unset" State:** Need to see what slipped through the cracks ? You can explicitly filter for records with no label, topic, gender or language. This functions exactly like clicking the "Unset" bar on a chart.

**Combining Label Rules:** Label filters are highly customizable. You can filter "any", "none" or "all" of your selected labels. You can also combine these rules to create highly specific views (for example: requiring a post to have _all_ of labels X and Y, but _none_ of labels A and B)

**Country vs. Language:** The system can easily detect a post's language even if the author's country is unknown. Because of this, language filters will always capture a higher volume of data than country filters.

**Pages & Groups:** Because a post cannot belong to a page and a group at the same time, checking both boxes automatically tells the system to look for _either_ one, preventing your chart from returning a blank result.

**Empty Filters Do Not Widen:** Filters exist strictly to narrow your results. An empty "any" condition matches nothing at all, and an empty "none" condition has no effect on your data.

---

## 13. Duplicating a dashboard

When you duplicate a dashboard, the system is designed to save you time while preventing broken charts. It automatically copies over your overall layout, date settings, and all universal filters, while smartly clearing out any filters that are strictly tied to a specific company.

### What Copies Over Automatically

Your charts, layout, dates and all standard filters (like platform, language, sentiment, and demographics) copy over instantly. Because metrics like "Reply Sentiment" are universal, they transfer seamlessly.

### What Needs to Be Re-Selected

Filters that rely on company-specific data are automatically dropped. This includes: company, label, topic, reply topic and product.

If the system carried a custom topic over to a brand new company, your chart would break and show zero data. By dropping these specific filters during duplication, the system protects your data integrity and prompts you to select the correct labels for your new dashboard.
