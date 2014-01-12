# Realdeal

Not-yet-made set of software related to real estate.

Use it to keep track of properties that you find from different sources
(emails from your agent, browsing Redfin, etc); it doesn't matter where
the data comes from, realdeal will take as much or as little data from you
in order to populate fields in the database -- at the minimum, realdeal
requires the street address -- this is used to ping various sources
such as Redfin to pick up the remaining data.

## Status

Waiting for 3rd party services like Redfin & Zillow to release and
improve API, respectively. The first thing we need is to be able to make
a queries like this:

1. find all for-sale properties priced below X that publish rental income within LOCATION sorted by difference between estimated mortgage minus cumulative rental income

2. source crime data for LOCATION from government sites for overall score calc

Currently I'm finding that published rental income is only on Redfin,
which has no API and would require a hefty amount of time investment to
build a DOM scraper that would be brittle. Zillow does not seem to have
this information. In addition, not every property has the rental income.
Zillow's APIs try to do a "Zestimate" type guess on the Rental but upon
examination this wasn't even in the XML results from Zillow's deep
search API. So right now I can't even do #1 justice.

# Feature Wishlist

## Notifications

Redfin has a "Favorite" feature which works well, especially for
getting updates regarding changes to a property, but most of us don't
have the time to pore over emails. In addition, the email does not always
have the extra information that you're concerned with. It is better to
use the emails as inputs and let the software decide, based on your rules,
what is worth distracting you for.

## Math & Analysis

Setup post processing rules to source additional data from Redfin, Zillow,
government sources, etc. Automate the calculations you'd normally do by
hand in order to determine the value of a property.

## Action Management

When a good deal or property is discovered, and you want to take action
on it, it's not exactly clear what to do. The software should guide and be
aware of this process -- acting almost like a CRM. A "buy" button engages this action.

Clicking this button should begin or continue what's
essentially a Wizard through the home-buying process. e.g. check pre-approval, 
check budget, did you go look at the home in person? yes? you liked it?
did you identify and problems yet? No? Here's what you should check for,
print it and come back and fill that data in. Algorithms working on answers
to questions asked should also help to determine a fair offer amount.

## Rental Management

What if you buy an income property? What are your responsibilities? How do you
operate this new business?

Do I really want to enter the tenant's number into my phone? I should
just put the tentant's info into Realdeal under that Property, under
that Unit where his information belongs.

Handling tenant payments and related tasks should be supported as well.

## Financial Matters

Since realdeal is not just for the property acquisition process, but
also for post-acquisition, things like mortgage, utilities, and
other financial data like this regarding the property should stick with
the property.

Other information should also be collected that will help to determine when
a property is no longer wise to keep and is better off to be sold. Value
monitoring in combination with other factors should help add intelligence to this.

## Collaboration & Sharing

Buying a property is not a solo project -- we want to consult with a lot
of different people every step of the way. Realdeal facilitates this via
invite links that bring others into the platform.

Team management is critical to operating many properties and so should be
a core aspect of the app.
