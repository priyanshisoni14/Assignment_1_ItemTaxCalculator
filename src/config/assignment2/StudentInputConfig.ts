import {
    InputConfig
} from "../../models/InputConfig";

import {
    Course
} from "../../models/assignment2/Course";


const validCourses =
    Object.values(
        Course
    );


const parseCourses = (value: string): string[] =>
    value
        .split(",")
        .map(
            course =>
                course
                    .trim()
                    .toUpperCase()
        );


export const studentInputConfig:
    InputConfig = {

    fullName: {
        required: true,

        validations: [
            {
                validate: (value) =>
                    value
                        .trim()
                        .length > 0,

                errorMessage:
                    "Full name cannot be empty."
            }
        ],

        transform: (value) =>
            value
                .trim()
                .replace(
                    /\s+/g,
                    " "
                )
    },


    age: {
        required: true,

        validations: [
            {
                validate: (value) =>
                    /^\d+$/.test(
                        value.trim()
                    ),

                errorMessage:
                    "Age must be a positive integer."
            },

            {
                validate: (value) =>
                    Number(
                        value.trim()
                    ) > 0,

                errorMessage:
                    "Age must be greater than zero."
            }
        ],

        transform: (value) =>
            Number(
                value.trim()
            )
    },


    address: {
        required: true,

        validations: [
            {
                validate: (value) =>
                    value
                        .trim()
                        .length > 0,

                errorMessage:
                    "Address cannot be empty."
            }
        ],

        transform: (value) =>
            value
                .trim()
                .replace(
                    /\s+/g,
                    " "
                )
    },


    rollNumber: {
        required: true,

        validations: [
            {
                validate: (value) =>
                    /^\d+$/.test(
                        value.trim()
                    ),

                errorMessage:
                    "Roll number must be a positive integer."
            },

            {
                validate: (value) =>
                    Number(
                        value.trim()
                    ) > 0,

                errorMessage:
                    "Roll number must be greater than zero."
            }
        ],

        transform: (value) =>
            Number(
                value.trim()
            )
    },


    courses: {
        required: true,

        validations: [
            {
                validate: (value) => {

                    const courses =
                        parseCourses(value);

                    return (
                        courses.length === 4
                    );
                },

                errorMessage:
                    "Exactly four courses must be selected."
            },

            {
                validate: (value) => {

                    const courses =
                        parseCourses(value);

                    return courses.every(
                        (course) =>
                            validCourses.includes(
                                course as Course
                            )
                    );
                },

                errorMessage:
                    "Courses must be selected from A, B, C, D, E, and F."
            },

            {
                validate: (value) => {

                    const courses =
                        parseCourses(value);

                    return (
                        new Set(
                            courses
                        ).size === courses.length
                    );
                },

                errorMessage:
                    "Duplicate courses are not allowed."
            }
        ],

        transform: (value) =>
            parseCourses(value).map(
                (course) =>
                    course as Course
            )
    }
};