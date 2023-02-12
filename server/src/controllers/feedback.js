import { FeedBack } from "../models/feedback";


export const createFeedBack = async (req, res, next) => {
    try {
        const { problem, idea, star } = req.body
        const cusId = req.user.userId;
        const fb =await FeedBack.create({ problem, idea, star, cusId });
        res.status(200).json({success:true, msg: 'Feedback thanh cong', data: fb})
    } catch (error) {
        res.json({
            message: "Có lỗi xảy ra",
            error: error.message
        });
    }
}

export const viewFeedback = async (req, res, next) => {
    try {
        const fbs = await FeedBack.find().sort({"createdAt" : -1})
        res.status(200).json({success:true, data: fbs})
    } catch (error) {
        res.json({
            message: "Có lỗi xảy ra",
            error: error.message
        }); 
    }
}

export const locFeedback = async(req, res, next) => {
    try {
        const { match, type, sort, sortType } = req.query
        let matchfb
        switch (type) {
            case 'idea':
                matchfb = FeedBack.find({idea: {$regex: '.*' + match + '.*'}})
                break;
            case 'problem': 
                matchfb = FeedBack.find({ problem: { $regex: '.*' + match + '.*' } })
            case 'star': 
                matchfb = FeedBack.find({ star: { $regex: '.*' + match + '.*' } })
            case '': 
                matchfb = FeedBack.find()
            default:
                break;
        }
        switch (sortType) {
            case 'date':
                matchfb.sort({createdAt: sort})
                break;
            case 'star':
                matchfb.sort({ star: sort })
            case 'cus': 
                matchfb.sort({cusId: sort})
            default:
                break;
        }
        matchfb =  await matchfb.populate('cusId').exec()
        res.status(200).json({success:true, feedback: matchfb})
        
    } catch (error) {
        console.log(error)
        res.json({
            message: "Có lỗi xảy ra",
            error: error.message
        }); 
    }
}

export const deleteFeedback = async (req, res, next) => {
    try {
        await FeedBack.findByIdAndDelete(req.params.id);
        res.status(200).json({success: true, msg:"Deleted Successfully"})
    } catch (error) {
        console.log(error)
        res.json({
            message: "Có lỗi xảy ra",
            error: error.message
        }); 
    }
}
