import Elysia, { t } from "elysia";

export const carModel = t.Union([
    t.Array(t.UnionEnum(["LBX - Subcompact Crossover", "NX - Luxury Mid-size SUV",
        "RX - Luxury Large SUV",
        "RZ - All-electric Luxury SUV",
        "ES - Luxury Sedan"])),
    t.UnionEnum(["LBX - Subcompact Crossover", "NX - Luxury Mid-size SUV",
        "RX - Luxury Large SUV",
        "RZ - All-electric Luxury SUV",
        "ES - Luxury Sedan"])
]);

export const partialForm = new Elysia().model({
    partial_form: t.Object({
        questionID: t.String(),
        answer: t.Union([
            t.String(),
            t.BooleanString(),
            t.Number(),
            t.File(),
            t.Object({
                minNum: t.Number(),
                maxNum: t.Number(),
            }),
            carModel,
            t.Date()
        ])
    })
});

export const straight_form = new Elysia().model({
    short_form: t.Object({
        full_name: t.String(),
        contact_number: t.String(),
        email_address: t.String(),
        gender: t.String(),
        age_range: t.String(),
        monthly_income: t.String(),
        assigned_sales_consultant: t.String(),
        interested_car_model: t.ArrayString(t.String()), 
        test_drive_preference: t.BooleanString(), 
        license_expiry_date: t.Optional(t.String()), 
        driving_license: t.Optional(t.File()),
    })
})

export const fullForm = new Elysia().model({
    full_form: t.Array(t.Object({
        questionID: t.String(),
        answer: t.Union([
            t.String(),
            t.BooleanString(),
            t.Numeric(),
            t.File({ type: "image" }),
            t.UnionEnum(['Male', 'Female']),
            t.Object({
                minNum: t.String(),
                maxNum: t.String(),
            }),
            t.UnionEnum(["LBX - Subcompact Crossover", "NX - Luxury Mid-size SUV",
                "RX - Luxury Large SUV",
                "RZ - All-electric Luxury SUV",
                "ES - Luxury Sedan"]),
            t.Date()
        ])
    }))
});

export const mobileBody = new Elysia().model({
    mobile_body: t.Object({
        mobile_num: t.String(),
    })
})

export const otpModel = new Elysia().model({
    otp_body: t.Object({
        mobile_num: t.String(),
        otp_num: t.ArrayString(t.Numeric())
    })
})

export const admin = new Elysia().model({
    admin_create: t.Object({
        username: t.String(),
        email: t.String(),
        password: t.String()
    }),
    admin_login: t.Object({
        username: t.String(),
        password: t.String()
    })
})

export const paginationData = new Elysia().model({
    page_body: t.Object({
        page_num: t.Number({default: 1}),
        page_size: t.Number({default: 10}),
        filter: t.Optional(t.Boolean()),
    })
})