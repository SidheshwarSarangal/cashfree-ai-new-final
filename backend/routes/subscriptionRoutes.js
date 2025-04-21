import { Router } from "express";
import { createSubscription, raiseCharge, getSubscriptionPaymentDetails, simulatePaymentResult, simulatePayment, createPlan, getSubscription, manageSubscription, getEligiblePaymentMethods } from "../controllers/subscriptionController.js";
import { createSubscriptionPlan} from "../controllers/subscriptionController.js"
const router = Router();

// Route to create a new subscription

router.post("/create", createSubscription);
router.post("/create-plan", createPlan);
router.get('/subscription-info/:subscription_id', getSubscription);
router.post('/manage/:subscription_id', manageSubscription);
router.post("/payment-methods", getEligiblePaymentMethods);
router.post("/pay", raiseCharge);
router.post('/simulate-payment', simulatePayment);
router.get('/simulate/:simulation_id', simulatePaymentResult); 
router.get('/payment/:subscriptionId/:paymentId', getSubscriptionPaymentDetails);


//router.post('/subscription-plans', createSubscriptionPlan);




export default router;