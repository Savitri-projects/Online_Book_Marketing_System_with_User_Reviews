const mysql = require("mysql");
const express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const { Router } = require("express");
const { render } = require("express/lib/response");
const { NULL } = require("mysql/lib/protocol/constants/types");
const encoder = bodyParser.urlencoded();
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use("/css",express.static("css"));
app.use("/js",express.static("js"));
app.use("/image",express.static("image"));
app.use("/image",express.static("login.html"));
app.use("/",express.static("/book-detail.ejs"))
app.use(express.static(__dirname + '/public/'));
app.use(express.static('public'))
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234567890",
    database: "online_book_marketing_system_with_user_reviews",
    multipleStatements: true

});

// connect to the database
connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});


app.get('/',encoder,function(req,res){
    connection.query("SELECT * FROM online_book_marketing_system_with_user_reviews.all_books", function(error, book_data, fields ){
        if(!!error){
            console.log('Error in the query');
        }
        else{
           // console.log(book_data);
           console.log(book_data[0].book_cost);
            res.render('books_page',{title: 'Express',book_data:book_data});
        }
    });
});
app.post('/explore',encoder,function(req,res){
   
    connection.query("SELECT * FROM online_book_marketing_system_with_user_reviews.all_books", function(error, book_data, fields ){
        if(!!error){
            console.log('Error in the query');
        }
        else{
            console.log('Success!');
           
            res.render('explore',{title: 'Express',book_data:book_data});
            
            //  res.render('books_page.ejs',{image_name: book_data[0].image_name,book_title: book_data[0].book_title,book_cost: book_data[0].book_cost })
        }
    })
        app.post('/',encoder,function(req,res){
            connection.query("SELECT * FROM online_book_marketing_system_with_user_reviews.all_books", function(error, book_data, fields ){
                if(!!error){
                    console.log('Error in the query');
                }
                else{
                    console.log(book_data[0].book_cost)
                    res.render('books_page',{title: 'Express',book_data:book_data});
                }
            });
        })
        app.post('/author_dm',encoder,function(req,res){
           res.render('author_dm')
        })
            app.post('/subscribe_result',encoder,function(req,res,next){
                var author_name = req.body.author_name;
                var author_image = req.body.author_image;
                var image_name = req.body.image_name;
                var genre = req.body.genre;
                var book_cost = req.body.book_cost;
                var book_title = req.body.book_title;
                var book_info = req.body.book_info;
                var author_info = req.body.author_info;
                if(author_name === "" || author_image === "" || image_name === "" || genre === "" || book_cost === "" || book_title ==="" || book_info === "" || author_info ===""){
                    author_name = null;
                }
                connection.query("INSERT INTO online_book_marketing_system_with_user_reviews.author(author_name,author_info,author_image) VALUES (?,?,?)",[author_name,author_info,author_image],function(error,details,fields){
                    if(!!error){
                       console.log(error)
                       res.render('subsribe_failure')
                    }
                    else{
                        console.log(details);
                        res.render("subscribe_thanks")
                    }
                })
                connection.query("INSERT INTO online_book_marketing_system_with_user_reviews.all_books(image_name,book_title,book_cost,book_description,genre) VALUES (?,?,?,?,?)",[image_name,book_title,book_cost,book_info,genre],function(error,details,fields){
                    if(!!error){
                        console.log("error")
                    }
                    else{
                        console.log("before subscribe_thanks - 1");
                        // res.render('subscribe_thanks')
                    }
                })
                connection.query("insert into writes(aut_id,book_id) VALUES ((SELECT author_id FROM author WHERE author_id=(SELECT max(author_id) FROM author)),(SELECT book_id FROM all_books WHERE book_id=(SELECT max(book_id) FROM all_books)))",function(error,details,fields){
                    if(!!error){
                        console.log(error)
                    }
                    else{
                        console.log("before subscribe_thanks - 3");
                        // res.render('subscribe_thanks')
                    }
                })
                connection.query("insert into reviews(rating,comment,name,role,book_id,image_info) VALUES (?,?,?,?,(SELECT book_id FROM all_books WHERE book_id=(SELECT max(book_id) FROM all_books)),?)",[5,"This book is very informative","Doe John","Designer","image/6.png"],function(error,details,fields){
                    if(!!error){
                        console.log(error)
                        // res.render('subsribe_failure')
                    }
                    else{
                        console.log("before subscribe_thanks");
                        // res.render('subscribe_thanks')
                    }
                })
               
            })
       
    
    
});
app.post('/feedback',encoder,function(req,res){
    //var book_id = req.body.book_id7;
   // console.log("Entry success to feedback")
    connection.query("SELECT * FROM online_book_marketing_system_with_user_reviews.feedback", function(error, book_data, fields ){
        if(!!error){
            console.log('Error in the query');
        }
        else{
            //console.log('Success!');
            //console.log(book_data);
            res.render('feedback',{title: 'Express',book_data:book_data});
            
            //  res.render('books_page.ejs',{image_name: book_data[0].image_name,book_title: book_data[0].book_title,book_cost: book_data[0].book_cost })
        }
    });
    
});

app.post('/book-detail',encoder,function(req,res,next){
    var book_id = req.body.book_id;
    connection.query("SELECT * FROM all_books where book_id = ?",[book_id],function(error,result,fields){
        if(!!error){
            console.log("Error in the query");
            console.log(error);
        }
        else{
            res.render('book-detail',{title:'Express', book_data2:result});
        }
    });
        app.post('/review',function(req,res,next){
            var book_id_review = req.body.book_id3;
            connection.query("SELECT * FROM online_book_marketing_system_with_user_reviews.reviews where book_id = ?",[book_id_review],function(error, review, fields){
                if(!!error){
                    console.log(error);
                }
                else{
                    console.log(review)
                    res.render('review',{title:'Express', review_data:review});
                }
            })
            app.post('/review_result',function(req,res,next){
                var rating = req.body.rating;
                var name = req.body.name;
                var role = req.body.role;
                var gender = req.body.gender;
                var comment = req.body.comment;
                var book_id = req.body.book_id;
                if(gender === "Female") {
                    var image_info = "image/4.jpg";
                }
                else{
                    var image_info = "image/21.jpg";
                }
                if(rating === "" || name === ""|| role ==="" ||gender ==="",comment === ""){
                    role = null;
                }
                connection.query("INSERT INTO reviews(rating,comment,name,role,book_id,image_info) VALUES (?,?,?,?,?,?)",[rating,comment,name,role,book_id,image_info],function(error,details,fields){
                    if(!!error){
                        res.render('review_failure')
                        console.log(error);
                    }
                    else{
                        console.log(details);
                        res.render('review_thanks_page')
                    }
                })
            })
            
            
        })
    
        app.post('/author_info',function(req,res,next){
        console.log("Hello!!")
        var book_id_review = req.body.book_id4;
        connection.query("SELECT author_name,author_id,author_info,author_image from author,writes where book_id=? and author_id=aut_id",[book_id_review],function(error, auth_info, fields){
            if(!!error){
                console.log(error);
            }
            else{
                console.log(auth_info);
                res.render('author_info',{auth_info:auth_info});
            }
        })
    })
        app.post('/buy_page',encoder,function(req,res,next){
        var book_id1 = req.body.book_id2;
        //console.log("Hello!!!")
       //res.redirect('/book-detail');
        
        connection.query("SELECT writes.book_id,author_name,book_cost,book_title FROM author,all_books,writes where writes.book_id=? and all_books.book_id=writes.book_id and author.author_id=writes.aut_id;",[book_id1],function(error,result1,fields){
            if(!!error){
                console.log("Error in the query");
                console.log(error);
            }
            else{
                //console.log('Success!');  
                //console.log(result1);
                //console.log("Before buy page being rendered")
                res.render('buy_page',{title:'Express', result1:result1});
                app.post('/result',encoder,function(req,res,next){
                    //console.log("Entered successfully")
                    function pad2(n) {
                        return (n < 10 ? '0' : '') + n;
                      }
                    var book_id = req.body.book_id8;
                    var customer_email = req.body.email;
                    var transaction_ID = req.body.transaction_id;
                    var coupon_code = req.body.coupon_code;
                    var date2 = new Date();
                    var month = pad2(date2.getMonth()+1);//months (0-11)
                    var day = pad2(date2.getDate());//day (1-31)
                    var year= date2.getFullYear();
                    var date =  year+"-"+month+"-"+day;
                    console.log(customer_email);
                    console.log(date);
                    console.log(transaction_ID);
                      if(customer_email === "" || transaction_ID === ""){
                          customer_email = null;
                      }
                      console.log(customer_email)
                    connection.query("INSERT INTO online_book_marketing_system_with_user_reviews.transaction_table(transaction_ID,date,customer_email,book_id,coupon_code) VALUES (?,?,?,?,?)",[transaction_ID,date,customer_email,book_id,coupon_code],function(error,details,fields){
                        if(!!error){
                            res.render('transaction_failure')
                            console.log(error);
                        }
                        else{
                            console.log(details);
                            res.render('thanks_page')
                        }
                    })
                })
            }
        })
        
        
    
})
})
    
   


// set app port 
PORT = 4003;
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`);
});