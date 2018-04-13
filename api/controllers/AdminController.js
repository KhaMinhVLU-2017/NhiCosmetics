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
        var pathIMG;
        try {
            await req.file('txt_images').upload({ //upload file
                dirname: require('path').resolve(sails.config.appPath, 'assets/Images/product')
                // var path=dirPath
            },async function (err, file) {
                if (err) return res.serverError(err);
                console.log('Save complete IMG ' + file);
                pathIMG = file[0].fd;
                let n = pathIMG.indexOf("Images");//Cut from Images
                pathIMG = pathIMG.substring(n - 1, 500);//Cut to Link onlyget khuc giua
                try {
                    for (var i = 0; i <= pathIMG.split('\\').length; i++) {
                        pathIMG = pathIMG.replace('\\', '/');//Change for comfortable Images
                    }
                }catch(Exeption){
                    console.log("For redundancy "+ err);
                }
                console.log(pathIMG);
                var countImg = await Image.count();
                countImg++;
                await Image.create({ // save IMG in DB
                    id: countImg,
                    imgSrc: pathIMG,
                    idProduct: count
                }).exec((err, reco) => {
                    if (err) return res.serverError(err);
                    console.log('Complete Save DB IMG ' + reco);
                })

            })


            var count = await Product.count();
            count = count + 1;
            var title = req.param('txt_title');
            var name = req.param('txt_name');
            var idType = parseInt(req.param('txt_type'));
            var price =await parseInt(req.param('txt_price'));
            var source = req.param('txt_source');
            var description = req.param('txt_des');
            var content = req.param('txt_content');
            var unitPrice = req.param('txt_unit');
            var discount =await parseInt(req.param('txt_discount'));
            await Product.create({ //Create Product
                id: count, title, name, idType, source, description, content, price, unitPrice, discount
            }).exec(function (err, recor) {
                if (err) return res.serverError(err);
                console.log('Create product ' + name + ' Complete ' + count);
                return res.redirect('/admin/listproduct');
            });
        }
        catch (Exeption) {
            console.log(Exeption);
        }
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

