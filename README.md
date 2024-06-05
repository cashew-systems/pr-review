# Pallet PR review interview

## Summary

You're an engineering manager at Pallet reviewing one of the first manjor PRs for a new member of your team. You'd like to provide them feedback on how to execute major tasks to ensure that their performance meets the bar going forward. You should aim to provide both micro feedback along with macro feedback. Part of the interview is to prioritize what kind of feedback is most valuable to give them. 

## The ticket text

### Summary

We’re adding support for a sales variance report that allows the user to see the variance in sales between two time periods for a single customer. This report compares revenue, shipments, pieces, and weight for two selected periods and calculates the sales variance and percentage change from one period to the other.

### Acceptance criteria:

When creating the report the user is able to select:

1. A customer to examine the sales of 
2. Initial time period (including start and end)
3. Ending time period (including start and end) - ending time must be after initial time. 
4. The user is able to generate the report in both PDF form and in excel form. 
5. In the PDF form the report shows the user the:
	a. Total of the weight, revenue, pieces, and number of shipments in one time period. 
	b. Total of the weight, revenue, pieces, and number of shipments in the next time period. 
