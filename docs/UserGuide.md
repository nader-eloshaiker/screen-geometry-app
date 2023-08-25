# Screen Geometry!

This app is more for show casing some **Dev Tooling**, **Web Dev Frame Works**, **Testing Practices** and **Automated Deployments**. However, as a bonus, it is a useful tool for *comparing different monitor screen configurations*.
I have been considering what my next monitor purchase will be and it has been difficult to conceptualise the different monitor sizes and aspect ratios when I only own a 27" - 16:9 monitor. So this app also has some utility outside of being a reference for frontend tech.

## How the user interacts with the app
### 1 Creating a monitor configuration
The home page is the main feature of the app. In desktop mode, the user has a form on the left inside in the *side bar* to add a monitor configuration.

#### 1.1 Search
The user has a search bar which they can click on to reveal a list of preconfigured monitors. The user can reduce the size of the list by typing in some of the requirements they are seeking. Once the desired monitor is found, the user can click on it and it will pre-populate the form with the selected data.
*This is not a mandatory step and the user can skip it and populate the Diagonal Size and Aspect Ratio manually.*

#### 1.2 Creating a monitor configuration
As a minimum, the user must enter a monitor size (diagonal screen size) and an aspect ratio, to be able to create a monitor entry to compare with.
The user can also add resolution to be able to get a more detailed comparison of the monitors.

#### 1.3 Screen Configuration Table
Once the users data is stored, the data is rendered onto a table. This table allows the user to "*Favorite*" a particular screen so that it remains accentuated in the GUI Panel (described below) for better reference. Moving the mouse over each column or clicking on a column will temporarily highlight the GUI representation as well as highlight the row.

#### 1.4 Screen Configuration GUI
The configuration GUI is located directly below the table and show an outline of the monitor size. As the user adds more screen configurations, they will be added with a relative size to the others. This allows the user to view all the monitors with respect to each other to appreciate the variations in screen realestate.
Moving your mouse over each screen, it will temporarily highlight the screen outline and also highlight the respective table row. 
Screens that have been favorited, will stay highlighted permanently or unless "unfavorited".