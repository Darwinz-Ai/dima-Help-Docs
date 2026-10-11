---
label: How The Numbers Are Counted
description: >-
  Understand exactly how Made For You charts calculate their numbers: what each
  total includes, what it leaves out, and why two charts can show different
  results.
order: 1
readingTime: 16
---

# Understanding Your Chart Metrics

To get the most out of your Made For You charts, it helps to know exactly how your data is calculated.

This guide outlines the rules used to calculate the metrics in your charts. We cover what goes into each total, what is left out, and why overlapping charts sometimes give different results.

Knowing these rules helps you use your reporting features more effectively, understand the exact scope of your data, and build better charts.

---

## 1. The Four Layers of Chart Filtering

To give you the most accurate insights, every chart refines your data through four sequential steps before producing a final number:

![Diagram showing chart data narrowing through four steps: all monitored data, then the dashboard's companies, then the date range, then relevant and non-deleted content, then the chart and dashboard filters, which produce the final number](https://storage.googleapis.com/mediamonitor/dimabothelp/images/en/audience-intelligence/web/made-for-you/how-numbers-created/how-numbers-created-filtering-funnel.png)

### The Dashboard's Companies

The chart only pulls data for the companies assigned to its dashboard.

### The Date Range

The chart follows the dashboard's date range, unless you have set a custom date range for that specific chart (see Section 7).

### Active & Relevant Content

Charts only count data that is relevant to your monitoring.

- **For social posts and conversations:** this means content dima identified as relevant that you haven't deleted.
- **For Google reviews:** this covers your currently tracked locations (see how to track locations).

Because this standard applies everywhere, it keeps your entire dashboard consistent.

### Applied Filters

Each chart applies both its own filters and your dashboard-wide filters. Data must satisfy **all** applicable conditions to be counted.

**Note:** If a dashboard filter doesn't match a chart's data source (like a star-rating filter on a social post chart), the chart simply ignores it and stays unchanged.

---

## 2. How Social Posts Are Counted

The golden rule for social data in your charts is simple: **a post is counted per company, while a person is counted once.**

![Diagram comparing how posts and people are counted: one post tracked by Company A and Company B counts as 2 posts, while one author with 100K followers tracked by both companies still counts as 100K followers](https://storage.googleapis.com/mediamonitor/dimabothelp/images/en/audience-intelligence/web/made-for-you/how-numbers-created/how-numbers-created-posts-vs-people.png)

### Posts Monitored by More Than One Company

Let's say Company A and Company B both track the same account. A single post from that account is captured once for Company A and once for Company B. If you view a chart covering both companies, that post is counted twice. This happens by design.

Why? Because it lets each company customize its own data. Each company might apply its own labels or topics to that exact same post. Keeping those records separate means your custom labels stay intact, and your individual company metrics always add up to your grand totals.

Keep this rule in mind when analyzing overall volume across a dashboard with overlapping companies.

### Authors, Own Pages and Follower Counts

While posts are counted per company, authors, own pages and groups are counted only once across your entire dashboard.

For example, if an account has 100,000 followers and is tracked by both Company A and Company B, a chart covering both companies will report exactly 100,000 followers, not 200,000. Because this is a single audience, counting it once prevents your chart from reporting inflated reach.

As you analyze multi-company dashboards, keep this distinction in mind: your post volumes grow with overlapping coverage, while your author and audience totals always reflect the true number of unique people reached.

### Calculating Engagement

Your engagement metric is a simple sum of four interactions: likes, comments, shares and saves. A post with 10 likes, 4 comments, 2 shares and 1 save equals 17 engagement.

![Graphic showing 10 likes plus 4 comments plus 2 shares plus 1 save equals 17 engagement, with views shown separately as not part of engagement](https://storage.googleapis.com/mediamonitor/dimabothelp/images/en/audience-intelligence/web/made-for-you/how-numbers-created/how-numbers-created-engagement.png)

**Note:** Views are intentionally excluded from this calculation and are provided as a separate metric, so you can clearly tell passive reach apart from active interaction.

### Page and Group Metrics

Your charts automatically sort posts into separate "buckets". Own Page metrics only track posts from own pages, and Group metrics only track posts within groups. These categories never overlap.

Everything else is a standard post. So, if a chart displays 40 total posts, made up of 12 page posts and 5 group posts, the remaining 23 are standard posts.

![Split bar showing 40 total posts divided into 12 own page posts, 5 group posts and 23 standard posts](https://storage.googleapis.com/mediamonitor/dimabothelp/images/en/audience-intelligence/web/made-for-you/how-numbers-created/how-numbers-created-post-buckets.png)

**Note:** For groups, the "follower" metric represents the group's total member count.

### Managing Company-Specific Labels

To keep your reporting customizable, labels belong only to the company that applies them. If multiple companies monitor the same post, tagging it in one company's dashboard won't overwrite or affect the others.

![Diagram showing the same post labeled Complaint in Company A's view and showing No label in Company B's view](https://storage.googleapis.com/mediamonitor/dimabothelp/images/en/audience-intelligence/web/made-for-you/how-numbers-created/how-numbers-created-labels-per-company.png)

Because labels are kept separate this way, you can trust your "No Label" category. A post lands there only if your company hasn't labeled it, so you never have to wonder whether another company's actions are affecting your charts.

### Why Chart Totals and Monitoring Screens Differ

You may notice that the post count on your Made For You charts is slightly higher than the count on your Monitoring screens for the same date range. This happens because the two features filter data differently:

- **Monitoring screens** only display a post if the author's full account profile has been captured and recorded in the system.

- **Made For You charts** prioritize total volume, counting every relevant post whether or not the author's full profile is on record.

Both numbers are accurate based on their own criteria. To keep your external reporting consistent, we recommend choosing one tool (either your charts or your monitoring feed) as your single source of truth for post volume.

---

## 3. How Google Reviews Are Counted

Google reviews follow the same per-company counting rules as social posts, with one additional rule for how star ratings are converted into sentiment.

### Locations Shared by More Than One Company

A physical location can be linked to more than one of your companies. When this happens, a review of that location is counted once for every company it belongs to.

If a shared branch has 100 reviews and is tracked by both Company A and Company B, a dashboard covering both companies will report 200 reviews. When broken down by company, each one shows 100. Just as with posts, this keeps your company-level numbers consistent with your overall chart totals.

![Diagram showing one shared branch with 100 reviews linked to Company A and Company B, each showing 100 reviews, for a dashboard total of 200](https://storage.googleapis.com/mediamonitor/dimabothelp/images/en/audience-intelligence/web/made-for-you/how-numbers-created/how-numbers-created-shared-locations.png)

### Selecting Your Locations

Your charts automatically focus on the locations you currently monitor. The location picker follows the same rule, so it never offers a location that your charts would exclude.

### How Star Ratings Map to Sentiment

Because Google reviews don't come with built-in sentiment, the system automatically translates the star rating into a sentiment category for you:

![Graphic showing 4 to 5 stars mapped to Positive, 3 stars mapped to Neutral, and 1 to 2 stars mapped to Negative](https://storage.googleapis.com/mediamonitor/dimabothelp/images/en/audience-intelligence/web/made-for-you/how-numbers-created/how-numbers-created-stars-to-sentiment.png)

This rule powers your sentiment filters, sentiment breakdowns and NPS scores. Because all three use the same scale, your metrics never conflict.

For instance, filtering your dashboard to "Positive" and grouping a chart by sentiment will always select the exact same reviews.

### Sub-Rating Categories

Google lets customers leave specific sub-ratings on their reviews, but these don't all use the same scale. Categories like Service and Food use a 1-to-5 star rating, while others are plain numbers, such as Wait Time (in minutes) and Group Size (number of people).

Because these metrics use different scales, averaging them together across your dashboard (for example, combining a 5-star rating, a 12-minute wait and a party of 3) produces a distorted, unusable number.

#### Best Practice for Meaningful Data

Group your chart by sub-rating category, or apply a filter to view one category at a time. When you filter down to a single category, the system removes the others from the calculation, giving you a clean, precise average for that category.

### How Topics Are Filtered

To keep your data exploration efficient, your topic filters have two built-in safeguards:

- **Active Topics Only:** The topic picker only displays topics currently applied to your reviews.

- **Capitalization Grouping:** To prevent fragmented reporting, the system automatically merges topics that differ only by capitalization (e.g. "iPhone" and "iphone").

---

## 4. How Product Reviews Are Counted

Product reviews are your most straightforward data source. Because each review belongs to one product, and each product belongs to one company, nothing is ever counted twice. The total on your chart is the exact number of unique reviews you have received.

When analyzing product reviews, keep these three rules in mind:

- **Consistent Sentiment:** We apply the same star-rating scale here as we do for Google reviews (see How Star Ratings Map to Sentiment).

- **Marketplace Platforms:** The "Platform" label tells you where a review was published (e.g. Amazon, Noon), so you can track specific marketplace trends.

- **Verified Purchase Insights:** You can use the "Verified Purchase" metric in two ways:
  - As a category to split your charts
  - As a sum to measure how many reviews came from confirmed buyers

---

## 5. How Conversations Are Counted

Conversation charts are designed to measure replies. The most powerful tool for controlling these charts is your date range setting, which changes the scope of your data depending on how you anchor it.

### Anchoring Your Date Range: Replies vs. Posts

You can anchor your conversation data to either the date of the reply or the date of the original post:

- **Reply-Anchored (Audience Activity):** The date range selects replies that arrived within your chosen timeframe. The original posts are pulled in only to give those replies context. **Use this to answer:** _"What was my audience saying during May?"_

- **Post-Anchored (Campaign Performance):** The date range selects posts that were published within your chosen timeframe, then pulls in every reply those posts ever received, no matter when the replies were posted. **Use this to answer:** _"How did my May campaign perform overall?"_

#### How This Looks in Practice

Imagine you publish a post on May 20th, and it keeps getting replies through June 30th.

![Timeline from May to June showing a post on May 20 with replies continuing to June 30. A post-anchored May chart counts all replies, while a reply-anchored May chart only counts the replies written in May](https://storage.googleapis.com/mediamonitor/dimabothelp/images/en/audience-intelligence/web/made-for-you/how-numbers-created/how-numbers-created-conversation-anchoring.png)

- If your chart is **Post-Anchored** for May, it includes the June replies because the parent post belongs to May. When you group this chart by date, all these replies stack under May.

- If your chart is **Reply-Anchored** for May, it only counts the replies written in May and leaves the June replies out. When you group this chart by date, the data is organized by the month each reply was written.

### Post Metrics in Conversation Charts

In conversation charts, parent post data never skews your results. Even if a post has 40 replies, the post's likes, views and total engagement are counted exactly once.

![Diagram showing one post with 500 likes and 40 replies, where the post's likes are counted once as 500 rather than multiplied by the replies](https://storage.googleapis.com/mediamonitor/dimabothelp/images/en/audience-intelligence/web/made-for-you/how-numbers-created/how-numbers-created-post-metrics-once.png)

This rule keeps your post metrics accurate instead of multiplying them by a busy comment section.

---

## 6. Sentiment, NPS and Percentages

### Understanding Your NPS Score

Your Net Promoter Score (NPS) measures audience sentiment on an index from -100 to +100. The system calculates it by subtracting the share of negative feedback from the share of positive feedback:

$$\text{NPS} = \left( \frac{\text{Positive} - \text{Negative}}{\text{Records with Sentiment}} \right) \times 100$$

**Note:** NPS only uses records that have a sentiment. Any record without one is ignored entirely, so your score reflects real opinions rather than empty data points.

For instance, if you have 100 posts but 40 have no sentiment, your NPS is calculated from the remaining 60.

![Worked NPS example: out of 100 posts, 40 have no sentiment and are ignored. The remaining 60 include 35 positive and 10 negative, giving an NPS of plus 42 on a scale from minus 100 to plus 100](https://storage.googleapis.com/mediamonitor/dimabothelp/images/en/audience-intelligence/web/made-for-you/how-numbers-created/how-numbers-created-nps-example.png)

Because of this, your NPS will not match the total post or reply count displayed next to it. They measure two different things: total volume vs. expressed sentiment.

Finally, because NPS is a standalone index that can drop below zero, it does not display a "percentage of total" value, which would be misleading.

### Reading Your Percentages

In a chart with multiple layers (e.g. a stacked bar chart), percentages show the breakdown _within each category_, not across the entire chart.

For example, if you split your platforms by sentiment, Instagram's positive, neutral and negative shares add up to 100% on their own. This lets you understand your performance on a single channel without doing extra math.

If you want percentages that represent your entire data set as a whole, use a scorecard or a chart with a single breakdown (e.g. a pie chart).

---

## 7. Handling Dates, Weeks, and Time Zones

### Localized Time Zones

Everything in your charts uses your account's time zone. Because your date ranges, chart visuals and post timestamps all share the same time zone, data never slips into the wrong day.

### How Weeks Are Calculated

To keep your reporting clean, weeks always begin on Sunday, and a single week is never split across two years. The year a week belongs to is always determined by its final day (Saturday).

**For instance:** The week beginning on Sunday, December 28th, 2025, ends on Saturday, January 3rd, 2026. Because the Saturday falls in 2026, the entire week counts as the first week of 2026.

![Calendar strip from Sunday December 28 to Saturday January 3, labeled as week 1 of 2026 because the Saturday falls in 2026](https://storage.googleapis.com/mediamonitor/dimabothelp/images/en/audience-intelligence/web/made-for-you/how-numbers-created/how-numbers-created-week-numbering.png)

This keeps your data grouped logically: a post from December 28th and a post from January 1st sit together in the same weekly bar.

### Year-Over-Year Grouping

If you use the "Week of Year" grouping, the system intentionally merges the data from the same calendar week across multiple years into a single bar.

This view is designed to help you spot seasonal trends and analyze year-over-year performance.

### Visualizing Inactive Periods

Your charts highlight activity, not empty space. If a day or week has no matching records, the chart skips it instead of plotting an empty bar.

This means your time series is a timeline of actual content, and any gap you see means there was no activity.

### Overriding Dashboard Date Ranges

<video controls=""><source src="https://storage.googleapis.com/mediamonitor/dimabothelp/images/en/audience-intelligence/web/made-for-you/how-numbers-created/section-7.mp4" type="video/mp4"></video>

You can lock individual charts to specific timeframes, so you can mix and match date ranges on a single dashboard:

| Setting          | What the chart covers                                 |
| ---------------- | ----------------------------------------------------- |
| Default          | The dashboard's standard range                        |
| Fixed            | Custom dates saved directly to the chart              |
| Period on period | The selected window and the equal timeframe before it |
| Year to date     | Jan 1 of the selected year to the end date            |
| Month to date    | The 1st of the selected month to the end date         |
| Last 30          | The 30 days before the end date                       |

The **Period on Period** setting deserves particular attention because it expands your date window rather than simply shifting it.

For example, if your dashboard is set to 1-31 May, a period-on-period chart will actually cover 1 April to 31 May. As a result, its totals will be larger than those of a chart using the default range.

![Two timelines comparing a default chart covering 1 to 31 May with a period-on-period chart covering 1 April to 31 May](https://storage.googleapis.com/mediamonitor/dimabothelp/images/en/audience-intelligence/web/made-for-you/how-numbers-created/how-numbers-created-period-on-period.png)

---

## 8. Managing Limits and the "Other" Bar

Setting a limit on your chart gives you control over your top-performing data. The chart selects your top values, and you decide what happens to the rest: drop them completely or roll them into a single "Other" bar.

### Selecting Your Top Data

To decide which values make the cut, the chart applies the first of these three rules that fits:

1. **Your Sort Settings:** It follows any metric sort you apply.

2. **Date Order:** For date breakdowns, it orders from oldest to newest.

3. **Largest First:** By default, it ranks by your first metric, highest first.

If two items tie, they are sorted alphabetically or numerically, so your chart stays the same every time you load it.

### How the "Other" Bar Works

<video controls=""><source src="https://storage.googleapis.com/mediamonitor/dimabothelp/images/en/audience-intelligence/web/made-for-you/how-numbers-created/section-8.mp4" type="video/mp4"></video>

The "Other" bar doesn't just hide data; it keeps your analytics accurate.

- It recalculates directly from the raw data, so unique counts (like total authors) and averages are never inflated.

- It stays at the end of your chart.

- It adapts to nested limits. For instance, if you look at the Top 3 Days inside the Top 5 Platforms, Facebook gets its own "Other" bar just for Facebook data.

- When applied to dates, it gathers all unlisted days into one bar. Click it to see the records from exactly those days.

---

## 9. Drilling Down into Your Chart Data

For social post charts, you can click any bar to open a detailed list of the posts behind it. (This will expand to Google reviews, product reviews and conversations in the future.)

### What You See Is Exactly What Was Counted

<video controls=""><source src="https://storage.googleapis.com/mediamonitor/dimabothelp/images/en/audience-intelligence/web/made-for-you/how-numbers-created/section-9.mp4" type="video/mp4"></video>

When you open a bar, you get an exact 1-to-1 match of the data behind that number. The detailed view inherits every filter, rule and date constraint applied to the chart.

If the bar counted 50 posts, you will see exactly those 50 posts, so you never have to guess where a number came from.

### How It Handles Edge Dates

This precision is especially helpful for weekly bars at the edge of your date range. For instance, if your date range begins on Thursday, May 1st, the bar represents that whole week, but it only counted data from May 1st onward.

![Weekly bar from Sunday April 27 to Saturday May 3 where April 27 to 30 fall outside the date range and only May 1 to 3 are counted and shown when the bar is opened](https://storage.googleapis.com/mediamonitor/dimabothelp/images/en/audience-intelligence/web/made-for-you/how-numbers-created/how-numbers-created-edge-week-drilldown.png)

When you open that bar, it only shows the posts from the in-range days, rather than making you sift through the entire calendar week.

---

## 10. Word Clouds

Your word clouds automatically filter out the noise so you can quickly spot the most important themes in your data.

### How Words Are Weighed and Filtered

![Example post with links, mentions, stop words and repeated words removed, leaving the words and hashtag that feed the word cloud, each counted once per post](https://storage.googleapis.com/mediamonitor/dimabothelp/images/en/audience-intelligence/web/made-for-you/how-numbers-created/how-numbers-created-word-cloud-filtering.png)

- **Reach over Repetition:** A word is counted once per post, review or reply, even if the author repeats it ten times. The size of a word reflects how many pieces of content mention it.

- **Top Results:** Each cloud displays your top 50 words alongside your top 50 hashtags.

- **Automatic Cleanup:** The system automatically removes links, @mentions, punctuation, single characters, numbers and common stop words (e.g. "the" or "في"). Arabic spelling variants are also merged automatically.

- **Language Focus:** Clouds support English and Arabic text. Other scripts (such as Cyrillic, Chinese or accented French) are excluded, which keeps your bilingual data clean.

- **Contextual Noise Reduction:** For social posts and conversations, your monitored account names and topics are excluded so they don't crowd out your audience's own keywords.

  **Note:** For reviews, topic words are intentionally kept, as they represent the core findings of the feedback.

- **Audience Voice:** Conversation clouds are built only from replies, so you see what your audience is saying rather than what your account published.

---

## 11. AI Insights

Your AI insights are built to provide qualitative themes rather than exact totals. To deliver clear, high-level summaries, the AI reviews a selected sample of your records rather than every individual data point.

- **Context over Volume:** The AI references a smaller set of records to find broader trends, so the numbers it cites will naturally be lower than your chart's total.

- **Text is Required:** The AI skips records with no text, like plain reposts or images without captions, because there is nothing to summarize.

  **Note:** While these are excluded from the AI insight, your chart always shows your true total.

---

## 12. Getting the Most Out of Filters

Before building a chart with filters, keep these key behaviors in mind:

- **The "Unset" State:** Need to see what slipped through the cracks? You can filter for records with no label, topic, gender or language. This works exactly like clicking the "Unset" bar on a chart.

- **Combining Label Rules:** Label filters are highly customizable. You can match "any", "none" or "all" of your selected labels, and combine these rules to create very specific views (for example, requiring a post to have _all_ of labels X and Y, but _none_ of labels A and B).

- **Country vs. Language:** The system can detect a post's language even when the author's country is unknown. Because of this, language filters usually capture more data than country filters.

  ![Nested diagram showing posts with a known country as a smaller set inside the larger set of posts with a detected language](https://storage.googleapis.com/mediamonitor/dimabothelp/images/en/audience-intelligence/web/made-for-you/how-numbers-created/how-numbers-created-country-vs-language.png)

- **Pages & Groups:** Because a post can't belong to a page and a group at the same time, checking both boxes tells the system to look for _either_ one, so your chart doesn't come back empty.

- **Empty Filters Do Not Widen:** Filters only ever narrow your results. An empty "any" condition matches nothing at all, and an empty "none" condition has no effect.

---

## 13. Duplicating a Dashboard

When you duplicate a dashboard, the system saves you time while preventing broken charts. It copies your layout, date settings and all universal filters, and clears any filters that are tied to a specific company.

![Two-column checklist: charts and layout, dates, platform, language and sentiment filters, demographics and reply sentiment copy over automatically, while company, label, topic, reply topic and product filters need to be re-selected](https://storage.googleapis.com/mediamonitor/dimabothelp/images/en/audience-intelligence/web/made-for-you/how-numbers-created/how-numbers-created-duplicate-dashboard.png)

### What Copies Over Automatically

Your charts, layout, dates and all standard filters (like platform, language, sentiment and demographics) copy over instantly. Universal filters like "Reply Sentiment" transfer as well.

### What Needs to Be Re-Selected

Filters that rely on company-specific data are automatically dropped. This includes company, label, topic, reply topic and product.

If the system carried a custom topic over to a new company, your chart would break and show zero data. Dropping these filters during duplication protects your data and lets you pick the right labels and topics for your new dashboard.
