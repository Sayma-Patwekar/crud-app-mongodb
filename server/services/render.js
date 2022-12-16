//this file allows us to render different files using router

exports.homeRoutes = (req,res) =>{   // exports keyword used to export homRoutes function so that it can be used in other files
    res.render('index');
} 

exports.add_user = (req,res) => {
    res.render('add_user');
}

exports.update_user = (req,res) => {
    res.render('update_user');
}