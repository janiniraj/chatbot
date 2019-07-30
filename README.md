## How do I get set up ?

### Install global typeScript node
```
[sudo] npm install -g typescript@2.9.2 ts-node@7.0.0
```

### Clone this repo
```
git clone git@gitlab.com:aichatbot/tinaai.git
```

### Install npm package
```
npm install
```

### Run

a. Run in development mode:
```
npm run dev
```
OR

b. Run in production mode:

```
npm run html
npm run prod
```

### Open
```
http://localhost:8082
```


## Database Setup
a. Go to root project. <br>
b. From CLI, run: docker-compose up. <br>
c. Once DB setup, open chatbot.sql and run the query. <br>

## UI
a. http://localhost:8082/chat --- For Chating <br>
b. http://localhost:8082/talk --- For Talking <br>

## Test Case
a. Command: help, login email, any promotion, and sign out. <br>
b. For DB test, please use 'login email' and enter email from db with any password. <br>