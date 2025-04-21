import fetch from "node-fetch";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";


dotenv.config();

//const CASHFREE_API_URL = "https://sandbox.cashfree.com/pg/api/v2/subscriptions/seamless/subscription";

export const createSubscription = async (req, res) => {
    try {
        const {
            subscription_id,
            customer_details,
            plan_details,
            authorization_details,
            subscription_meta,
            subscription_expiry_time,
            subscription_first_charge_time,
            subscription_tags,
            subscription_payment_splits
        } = req.body;

        const options = {
            method: "POST",
            headers: {
                "x-api-version": process.env.CASHFREE_API_VERSION,
                "x-client-id": process.env.CASHFREE_CLIENT_ID,
                "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                subscription_id,
                customer_details,
                plan_details,
                authorization_details,
                subscription_meta,
                subscription_expiry_time,
                subscription_first_charge_time,
                subscription_tags,
                subscription_payment_splits
            })
        };

        const response = await fetch("https://sandbox.cashfree.com/pg/subscriptions", options);
        const data = await response.json();

        res.status(200).json(data);
    } catch (error) {
        console.error("Error creating subscription:", error);
        res.status(500).json({ message: "Failed to create subscription", error: error.message });
    }
};

export const getSubscription = async (req, res) => {
    const { subscription_id } = req.params;

    if (!subscription_id) {
        return res.status(400).json({ success: false, message: "Subscription ID is required" });
    }

    try {
        const response = await fetch(`${"https://sandbox.cashfree.com/pg/subscriptions"}/${subscription_id}`, {
            method: 'GET',
            headers: {
                'x-api-version': process.env.CASHFREE_API_VERSION,
                'x-client-id': process.env.CASHFREE_CLIENT_ID,
                'x-client-secret': process.env.CASHFREE_CLIENT_SECRET
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ success: false, message: "Failed to fetch subscription", error: data });
        }

        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Error fetching subscription:", error);
        res.status(500).json({ success: false, message: "Failed to fetch subscription", error: error.message });
    }
};

export const manageSubscription = async (req, res) => {
    const { subscription_id } = req.params;
    const { action, action_details } = req.body;

    if (!subscription_id || !action || !action_details) {
        return res.status(400).json({ success: false, message: "Subscription ID, action, and action details are required" });
    }

    try {
        const response = await fetch(`${"https://sandbox.cashfree.com/pg/subscriptions"}/${subscription_id}/manage`, {
            method: 'POST',
            headers: {
                'x-api-version': process.env.CASHFREE_API_VERSION,
                'x-client-id': process.env.CASHFREE_CLIENT_ID,
                'x-client-secret': process.env.CASHFREE_CLIENT_SECRET,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subscription_id,
                action,
                action_details
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ success: false, message: "Failed to manage subscription", error: data });
        }

        res.status(200).json({ success: true, message: "Subscription managed successfully", data });
    } catch (error) {
        console.error("Error managing subscription:", error);
        res.status(500).json({ success: false, message: "Failed to manage subscription", error: error.message });
    }
};


export const getEligiblePaymentMethods = async (req, res) => {
    const { subscription_id } = req.body;

    if (!subscription_id) {
        return res.status(400).json({ success: false, message: "Subscription ID is required." });
    }

    const options = {
        method: "POST",
        headers: {
            "x-api-version": process.env.CASHFREE_API_VERSION,
            "x-client-id": process.env.CASHFREE_CLIENT_ID,
            "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            queries: { subscription_id },
            filters: { payment_methods: [] }
        })
    };

    try {
        const response = await fetch("https://sandbox.cashfree.com/pg/subscriptions/eligibility/payment_methods", options);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ success: false, message: data.message || "Failed to fetch payment methods." });
        }

        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Error fetching payment methods:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};


const CASHFREE_PLAN_URL = "https://sandbox.cashfree.com/pg/plans";

export const createPlan = async (req, res) => {
    try {
        const {
            plan_id,
            plan_name,
            plan_type,
            plan_currency,
            plan_recurring_amount,
            plan_max_amount,
            plan_max_cycles,
            plan_intervals,
            plan_interval_type,
            plan_note,
        } = req.body;

        const options = {
            method: "POST",
            headers: {
                "x-api-version": process.env.CASHFREE_API_VERSION,
                "x-client-id": process.env.CASHFREE_CLIENT_ID,
                "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                plan_id,
                plan_name,
                plan_type,
                plan_currency,
                plan_recurring_amount,
                plan_max_amount,
                plan_max_cycles,
                plan_intervals,
                plan_interval_type,
                plan_note,
            }),
        };
        console.log(process.env.CASHFREE_API_VERSION);

        const response = await fetch("https://sandbox.cashfree.com/pg/plans", options);
        const data = await response.json();

        res.status(200).json(data);
    } catch (error) {
        console.error("Error creating plan:", error);
        res.status(500).json({
            message: "Failed to create plan",
            error: error.message,
        });
    }
};



export const raiseCharge = async (req, res) => {
    try {
        const {
            subscription_id,
            payment_amount,
            payment_schedule_date, // Received date (potentially incorrect)
            payment_remarks,
            payment_type,
            payment_method
        } = req.body;

        if (!subscription_id || !payment_amount || !payment_type || !payment_method) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // ✅ Convert to valid ISO8601 format
        const valid_schedule_date = new Date(payment_schedule_date).toISOString();

        const payment_id = uuidv4(); // Generate unique payment ID

        const options = {
            method: "POST",
            headers: {
                "x-api-version": process.env.CASHFREE_API_VERSION,
                "x-client-id": process.env.CASHFREE_CLIENT_ID,
                "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                subscription_id,
                payment_id,
                payment_amount,
                payment_schedule_date: valid_schedule_date, // ✅ Ensure correct format
                payment_remarks,
                payment_type,
                payment_method
            })
        };

        const response = await fetch("https://sandbox.cashfree.com/pg/subscriptions/pay", options);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ success: false, message: "Payment failed", error: data });
        }

        res.status(200).json({ success: true, message: "Payment processed successfully", payment_id, data });
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};


export const getSubscriptionPaymentDetails = async (req, res) => {
    try {
        const { subscriptionId, paymentId } = req.params;

        const url = `${'https://sandbox.cashfree.com/pg'}/subscriptions/${subscriptionId}/payments/${paymentId}`;

        const options = {
            method: 'GET',
            headers: {
                'x-api-version': process.env.CASHFREE_API_VERSION,
                'x-client-id': process.env.CASHFREE_CLIENT_ID,
                'x-client-secret': process.env.CASHFREE_CLIENT_SECRET
            }
        };

        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ success: false, error: data });
        }

        res.json({ success: true, data });
    } catch (error) {
        console.error('Error fetching payment details:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};




export const simulatePayment = async (req, res) => {
    try {
        const { entity, entity_id, payment_status, payment_error_code } = req.body;

        // Validate required fields
        if (!entity || !entity_id || !payment_status) {
            return res.status(400).json({
                success: false,
                message: "Missing required parameters: entity, entity_id, or payment_status"
            });
        }

        // Construct API request options
        const options = {
            method: 'POST',
            headers: {
                'x-api-version': process.env.CASHFREE_API_VERSION,
                'x-client-id': process.env.CASHFREE_CLIENT_ID,
                'x-client-secret': process.env.CASHFREE_CLIENT_SECRET,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                entity,
                entity_id,
                entity_simulation: {
                    payment_status,
                    ...(payment_status === "FAILED" && payment_error_code ? { payment_error_code } : {})
                }
            })
        };

        // Call Cashfree simulation API
        const response = await fetch('https://sandbox.cashfree.com/pg/simulate', options);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                success: false,
                message: "Simulation failed",
                error: data
            });
        }

        return res.status(200).json({
            success: true,
            message: "Payment simulation successful",
            data
        });

    } catch (error) {
        console.error("Error simulating payment:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};




export const simulatePaymentResult = async (req, res) => {
    try {
        const { simulation_id } = req.params; // Get simulation_id from URL params

        if (!simulation_id) {
            return res.status(400).json({ success: false, message: "Simulation ID is required" });
        }

        const options = {
            method: 'GET',
            headers: {
                'x-api-version': process.env.CASHFREE_API_VERSION,
                'x-client-id': process.env.CASHFREE_CLIENT_ID,
                'x-client-secret': process.env.CASHFREE_CLIENT_SECRET
            }
        };

        const response = await fetch(`https://sandbox.cashfree.com/pg/simulate/${simulation_id}`, options);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ success: false, error: data });
        }

        res.json({ success: true, data });

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};



export const createSubscriptionPlan = async (req, res) => {
    try {
        console.log("Client ID:", process.env.CASHFREE_CLIENT_ID); // Debugging
        console.log("Client Secret:", process.env.CASHFREE_CLIENT_SECRET);

        const { planId, planName, type, recurringAmount, maxAmount, intervals, intervalType } = req.body;

        const options = {
            method: 'POST', // ✅ Must be POST
            headers: {
              'X-Client-Id': process.env.CASHFREE_CLIENT_ID,
              'X-Client-Secret': process.env.CASHFREE_CLIENT_SECRET,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              planId,
              planName,
              type,
              recurringAmount,
              maxAmount,
              intervals,
              intervalType
            })
          };
          

        const response = await fetch('https://sandbox.cashfree.com/pg/api/v1/subscription-plans', options);
        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            return res.status(response.status).json({ error: data });
        }

        res.status(201).json({ message: 'Subscription plan created successfully', data });
    } catch (error) {
        console.error('Error creating subscription plan:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

