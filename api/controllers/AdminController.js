/**
 * AdminController
 *
 * @description :: Server-side logic for managing Admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    index: (req, res) => {
        return res.view('admin/index', { layout: 'layoutAdmin' });
    },
    crProduct: async (req, res) => {
        // var pathIMG;
        // try {
        //     //Lưu file IMG xuống DB
        //     await req.file('txt_images').upload({ //upload file
        //         dirname: require('path').resolve(sails.config.appPath, 'assets/Images/product')
        //         // var path=dirPath
        //     }, async function (err, file) {
        //         if (err) return res.serverError(err);
        //         console.log('Save complete IMG ' + file);
        //         pathIMG = file[0].fd;//get Path
        //         let n = pathIMG.indexOf("Images");//Cut PATH from Images
        //         pathIMG = pathIMG.substring(n - 1, 500);//Cut to Link only get khuc giua
        //         try {
        //             for (var i = 0; i <= pathIMG.split('\\').length; i++) {
        //                 pathIMG = pathIMG.replace('\\', '/');//Change for comfortable Images
        //             }
        //         } catch (Exeption) {
        //             console.log("For redundancy " + err);
        //         }
        //         console.log(pathIMG);
        //         var countImg = await Image.count();// Count ID PrimaryKey in DB để autoIncrement
        //         countImg++;
        //         await Image.create({ // save IMG in DB
        //             id: countImg,
        //             imgSrc: pathIMG,
        //             idProduct: count
        //         }).exec((err, reco) => {
        //             if (err) return res.serverError(err);
        //             console.log('Complete Save DB IMG ' + reco);
        //         })

        //     })

        //     //Save All information xuong DB
        //     var count = await Product.count();
        //     console.log(count);
        //     if (typeof count==="number") {
        //         count = count + 1;
        //         var title = req.param('txt_title');
        //         var name = req.param('txt_name');
        //         var idType = parseInt(req.param('txt_type'));
        //         var price = parseFloat(req.param('txt_price'));
        //         console.log(price);
        //         if (!isNaN(price)) {
        //             var source = req.param('txt_source');
        //             var description = req.param('txt_des');
        //             var content = req.param('txt_content');
        //             var unitPrice = req.param('txt_unit');
        //             var disString = req.param('txt_discount');
        //             var discount = parseFloat(disString);
        //             await Product.create({ //Create Product
        //                 id: count, title, name, idType, source, description, content, price, unitPrice, discount
        //             }).exec(function (err, recor) {
        //                 if (err) return res.serverError(err);
        //                 console.log('Create product ' + name + ' Complete ' + count);
        //                 return res.redirect('/admin/listproduct');
        //             });
        //         }else{
        //             console.log("Price Is Null Fuck");
        //         }
        //     }

        // }
        // catch (Exeption) {
        //     console.log(Exeption);
        // }
        
        
        //Saave hinh xuong db san~ lay thong tin
        var saveFolderImg = function(txt_images){
            var text;
            req.file(txt_images).upload({ //upload file
                dirname: require('path').resolve(sails.config.appPath, 'assets/Images/product')
                // var path=dirPath
            }, function (err, file) {
                if (err) return res.serverError(err);
                console.log('Save complete IMG ' + file);
                text=file;
            });
            return text;
        }
        //Corver sang img screen on Dispolay
        var pathName = function(file){
            pathIMG = file[0].fd;//get Path
            let n = pathIMG.indexOf("Images");//Cut PATH from Images
            pathIMG = pathIMG.substring(n - 1, 500);//Cut to Link only get khuc giua
            try {
                for (var i = 0; i <= pathIMG.split('\\').length; i++) {
                    pathIMG = pathIMG.replace('\\', '/');//Change for comfortable Images
                }
                return pathIMG;
            } catch (Exeption) {
                console.log("For redundancy " + err);
            }
            console.log(pathIMG);
        }

        //get all info
        var getInfo = function (count) {
            count = count + 1;
            var title = req.param('txt_title');
            var name = req.param('txt_name');
            var idType = parseInt(req.param('txt_type'));
            var price = parseInt(req.param('txt_price'));
            console.log(price);
            var source = req.param('txt_source');
            var description = req.param('txt_des');
            var content = req.param('txt_content');
            var unitPrice = req.param('txt_unit');
            var disString = req.param('txt_discount');
            var discount = parseInt(disString);
            var json = { count, title, name, idType, source, description, content, price, unitPrice, discount };
            return json;
        }
        
        var meofunc = async function () { 
            var count = await Product.count();
            var getAtt = await getInfo(count);
            var filehinh = await saveFolderImg(req.txt_images);
            var pathCover = await pathName(filehinh);
            var countImg = await Image.count();// Count ID PrimaryKey in DB để autoIncrement
            countImg++;
            await Image.create({ // save IMG in DB
                id: countImg,
                imgSrc: pathCover,
                idProduct: count
            }).exec((err, reco) => {
                if (err) return res.serverError(err);
                console.log('Complete Save DB IMG ' + reco);
            });



            //complete
            
            console.log(run);
            var meomeo = await Product.create({ //Create Product
                id: getAtt.count, title: getAtt.title, name: getAtt.name, idType: getAtt.idType, source: getAtt.source, description: getAtt.description, content: getAtt.content, price: getAtt.price,
                unitPrice: getAtt.unitPrice, discount: getAtt.discount
            }).exec(function (err, recor) {
                if (err) return res.serverError(err);
                console.log('Create product ' + getAtt.name + ' Complete ' + getAtt.count);
                return res.redirect('/admin/listproduct');
            });
        }
        meofunc();
    },
    listProduct: (req, res) => {
        Product.find().populate('Images').exec(function (err, recor) {// tham chieu Images cua Model Product ben trong khoa ngoai
            if (err) return res.serverError(err);
            console.log('All Product is ' + recor.length);
            return res.view('admin/listproduct', { layout: 'admin/layoutAdmin', entities: recor });
            //return res.json(recor[1].Images[0].imgSrc);
        });
    },
};

