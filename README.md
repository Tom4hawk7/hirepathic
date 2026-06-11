
## Viewing the app

Visit this domain: https://hirepathic.vercel.app/

## Setting up a local deployment

### Environment variables

Create a .env file in the root folder and define:

```
DATABASE_URL=""

JWT_SECRET=""

TEST_CANDIDATE_EMAIL="testcandidate@gmail.com"
TEST_CANDIDATE_PASSWORD="testcandidate123!"

TEST_EMPLOYER_EMAIL="testemployer@gmail.com"
TEST_EMPLOYER_PASSWORD="testemployer123!"
```

Database url should correspond to a neondb pooled connection string

### Seeding database

Run the following command:

```
npx prisma db seed
```

For obvious reasonse, you will need node package manager to run this command

### Running the application

Run the following command:

```
npm run dev
```