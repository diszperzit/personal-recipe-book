# Personal Recipe Book

## _AKA 100 Recipes To Save Your Stomach_

This software is a personal recipe book designed to keep count of all the foods one has mastered to cook.

Public Demo: https://100-recipes-to-save-your-stomach.netlify.app/

[![Netlify Status](https://api.netlify.com/api/v1/badges/002bb89e-7e94-4eb4-ae7a-c44c3a5cda1d/deploy-status)](https://app.netlify.com/sites/100-recipes-to-save-your-stomach/deploys)

Authentication: personal@recipes.web / Recipes123 (Note that the create/edit functions will **NOT** work in the demo application!)

## Features

-   Store recipes with difficulty levels, ingredients and steps and multiple images
-   List your recipes and filter them based on category / name
-   Edit / Delete your previously stored recipes

#### Screenshots:

|                    List                     |                    View                     |                    Edit                     |
| :-----------------------------------------: | :-----------------------------------------: | :-----------------------------------------: |
| ![Feature - Desktop - 1][feature-desktop-1] | ![Feature - Desktop - 2][feature-desktop-2] | ![Feature - Desktop - 3][feature-desktop-3] |
|  ![Feature - Mobile - 1][feature-mobile-1]  |  ![Feature - Mobile - 2][feature-mobile-2]  |  ![Feature - Mobile - 3][feature-mobile-3]  |

### Installation

Personal Recipe Book is based on React, Redux and create-react-app. It is **personal**, meaning it has no common database between users and requires the installation of local copies in order to work. To create a local copy:

1. Create a Realtime Database in [Firebase](https://firebase.google.com/docs/database).
2. Get your [API Key](https://firebase.google.com/docs/projects/api-keys#create-api-keys) and [Database URL](https://firebase.google.com/docs/database/web/start#initialize_the_javascript_sdk) and change the variables in src/helpers/utility.js to these values (the values that are present point to the public demo, where writing to the database is forbidden).
3. Deploy the codebase to your host of choice, e.g. [Netlify](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/).
4. Enjoy cooking!

### Roadmap

-   Calorie tracking through ingredients
-   Efficiency level

### License

MIT

[feature-desktop-1]: https://i.imgur.com/00eASnJ.png 'Feature - Desktop - 1'
[feature-desktop-2]: https://i.imgur.com/PadLMw3.png 'Feature - Desktop - 2'
[feature-desktop-3]: https://i.imgur.com/CICUl0y.png 'Feature - Desktop - 3'
[feature-mobile-1]: https://i.imgur.com/u74IzAY.jpg 'Feature - Mobile - 1'
[feature-mobile-2]: https://i.imgur.com/BdoZZlc.png 'Feature - Mobile - 2'
[feature-mobile-3]: https://i.imgur.com/I4F8cUg.png 'Feature - Mobile - 3'
