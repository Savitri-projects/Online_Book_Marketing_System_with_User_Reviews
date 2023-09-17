
# BookHub: A comprehensive online book marketing system with user reviews

BookHub is a cutting-edge web application that streamlines online book marketing. It offers two main functions: a diverse book catalog with detailed pages for exploration and a marketing section featuring star authors, popular books, discounts, author subscriptions, and more. Notably, authors can easily contribute their work. **The system's robust database management, powered by Node.js, MySQL Workbench, and Express JS, ensures efficient data retrieval**. 


## How to use it

1. First clone the repository with 
`git clone https://github.com/Savitri-projects/Online_Book_Marketing_System_with_User_Reviews.git` command

2. Install Node.js from [here](https://nodejs.org/en/download) - you can just click on 'Windows installer' if you are downloading on Windows, it is similar for others as well

3. Just restart your computer and part 1 of the setup is done

4. Next, you will need to setup MySQL workbench. For this please follow the steps may be from [here](https://www.simplilearn.com/tutorials/mysql-tutorial/mysql-workbench-installation)

5. Create a schema called `online_book_marketing_system_with_user_reviews` and import `OBMS.sql` file into it.

6. You will find the following at around line 19 in `app.js` file
   ```
   const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234567890",
    database: "online_book_marketing_system_with_user_reviews",
    multipleStatements: true
    });
Edit `password` variable with your password and change the database name (in multiple places - please check) if you give any name other than online_book_marketing_system_with_user_reviews

7. That is it! You should be good to give `node app.js` command to run the application.

8. Make sure you give `node app.js` command in the vs code command prompt in the 'Online_Book_Marketing_System_with_User_Reviews' directory itself and open `localhost:4003` in your browser. You should be able to see a page something like this: 
![](https://i.postimg.cc/ZY9dFdBf/image.png)

9. Success 🥳🥳🥳. Let's find out what to check in the application

## What to check in this

**Please find this [video](https://drive.google.com/file/d/1FioNcQkGKorypQKUB3dOgyu-MUF-Yhmo/view?usp=drive_link)**
![](https://i.postimg.cc/NGVMxsWB/image.png)
1. Book detail page and each of 'review', 'Author info' and 'Buy' pages navigated from it

2. Adding a review with correct details

3. Subscribing as an author etc.,

## Enhancements that you can do

1. There are many enhancements possible

2. Add more books, authors etc.,

3. Implement login functionality

4. Implement a chatbot and integrate it to it

5. Under author subscription provision addition of multiple authors

6. There are limits to the way you can give 'gender in reviews section', 'genre in author subscription section' - make it more sophisticated

7. You can add real PDFs, actual transaction elements etc.,

8. Delete unnecessary things from the database

... and many more

Thanks for coming here!!
