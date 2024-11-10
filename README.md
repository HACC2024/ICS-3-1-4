# Aloha Archives
Aloha Archives is a user-friendly platform designed to help users discover, organize, and explore a wide array of datasets. The application offers personalized dataset recommendations based on user personas, which are determined through a brief quiz. Users can also favorite datasets for easy access and browse trending data collections.

Key features include:
- **Personalized Recommendations**: After completing a quiz to identify their "persona," users receive tailored dataset suggestions.
- **Dataset Favorites**: Users can save their favorite datasets to view under the "Favorites" tab.
- **Admin Management**: Admins can manage datasets by adding, editing, or removing them as necessary. They have full access to all user functionalities along with an additional "Manage Datasets" feature to maintain data integrity.

Aloha Archives enables both general users and administrators to easily navigate and personalize their data exploration journey.

# How to use Aloha Archives
## Deployed version
### User Instructions
The depolyed version of Aloha Archives can be accessed from: [https://aloha-archives.vercel.app/](https://aloha-archives.vercel.app/)
1. Sign in/Sign up
    - Create an account or log into an existing one.
2. Begin Exploring
    - Start searching for a database either using the search bar, the setting toggles, or browsing trending datasets on the home page.
    - You can also go straight to the dataset explore page by clicking on the 'Datasets' tab.
3. Save your favorites
    - While browsing the dataset explore page, you have the option to favorite datasets and view them under the 'Favorites' tab
4. Learn your Persona
    - Click on the 'Persona Quiz' tab and take a short quiz to be assigned a persona. Personalized datasets will be suggested to you in the 'Recommended' tab based on your persona.
    - *Don't like your persona?*
        - If you want to explore a new persona, click on your username in the top right corner, seelct 'My Profile', and click on the 'My Persona' tab where you are able to select your own persona.
        - You can also access your recommended and favorited datasets from this tab
## Admin Instructions
1. If you're an admin, you have access to all the same features as a regular user with an added 'Manage Datasets' tab
    - Under this tab, you are able to add and delete datatsets
    - You can also view all datasets under your profile and edit them as you see fit


## Source Code
Developers who are interested in running our project locally, they must have Next.js and PostgreSQL installed. Our tech stack also uses Vercel, ESLint, Javascript, and Bootstrap 5/React.

1. Clone the repository to your local computer.
2. Go into the app/directory by using the `cd` command. Then install the necessary third party libraries using `npm install`
3. Configure PostgreSQL Database by installing PostgreSQL on your local machine.
Then set up your .env.local file in the root of the project with the PostgreSQL connection string: `DATABASE_URL=postgresql://user:password@localhost:5432/dbname`
and run database migrations with `npx prisma migrate reset`
4. Run the Project Locally with `npm run dev`
5. Open http://localhost:3000 to view the running local application.
 
