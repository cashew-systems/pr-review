# Pallet PR review interview

## Summary

You're an engineering manager at Pallet reviewing one of the first manjor PRs for a new member of your team. You're going to to provide them feedback on how to execute major tasks to ensure that their performance meets the bar going forward. 

You should aim to provide both micro feedback along with macro feedback. Part of the interview is to prioritize what kind of feedback is most valuable to give them. 

Please create a Google Document with your interviewer and put a header for each file name. Record the comments you'd give for the PR along with the line number in the Google Document. 

This PR uses our technology stack, but none of the important issues are specific to Prisma, Typescript, React, or other particular technologies. Please focus on the coding style, architecture, organization, API design, and technology agonostic issues.

## The ticket text

### Summary

We’re adding support for a sales variance report that allows the user to see the variance in sales between two time periods for a single customer. This report compares revenue, shipments, pieces, and weight for two selected periods and calculates the sales variance and percentage change from one period to the other.

### Acceptance criteria:

When creating the report the user is able to select:

1. A customer to examine the sales of 
2. Initial time period (including start and end)
3. Ending time period (including start and end) - ending time must be after initial time. 

Additional criteria:

4. The user is able to generate the report in both PDF form and in excel form. 
5. In the PDF form the report shows the user the:
    1. Total of the weight, revenue, pieces, and number of shipments in one time period. 
    2. Total of the weight, revenue, pieces, and number of shipments in the next time period. 
