const Listing = require('../models/listing')
const {listingSchema} = require('../schema.js')

module.exports.index = async (req,res) => {
    const allListings = await Listing.find({})
    res.render("listings/index",{allListings})
}

module.exports.renderNewForm = (req,res) => {
    res.render('listings/new')
};

module.exports.showListing = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate: {
            path: "author",
        },
     })
    .populate('owner')
    if(!listing){
        req.flash('error',"Listing you requested for does not existed")
        res.redirect('/listings')
    }
    console.log(listing)
    res.render("listings/show",{listing})
}

module.exports.createListing = async (req,res,next) => {
    let url, filename;
    
    if (req.files && req.files['listing[image]'] && req.files['listing[image]'][0]) {
        url = req.files['listing[image]'][0].path;
        filename = req.files['listing[image]'][0].filename;
        console.log(url, "...", filename);
    }
        const newListing = new Listing(req.body.listing)
        newListing.owner = req.user._id
        newListing.image = {url,filename}
        await newListing.save();
        req.flash('success','new listing created!')
        res.redirect('/listings');
}

module.exports.renderEditForm = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    if(!listing){
        req.flash('error',"Listing you requested for does not exist")
        res.redirect('/listings')
    }
    let originalImageUrl = listing.image.url
    originalImageUrl = originalImageUrl.replace('/upload','/upload/w_250')
    res.render('listings/edit',{listing, originalImageUrl})
}

module.exports.updateListing = async (req,res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{ ...req.body.listing })

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename}
        await listing.save()
    }
    

    req.flash('success','listing updated')
    res.redirect(`/listings/${id}`)
}

module.exports.destroyListing = async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash('success','Listing Deleted')
    res.redirect('/listings')
}