import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

export const reviewType = defineType({
    name : 'Reviews',
    title: 'Reviews',
    type : 'document',
    description: 'Enter review data collected from surveys',
    icon: StarIcon,
    fields : [
        defineField({
            name : 'Name',
            description: 'Name of the reviewer',
            type: 'string'
        }),
        defineField({
            name : 'Heading',
            description: 'A heading for the review',
            type: 'string'
        }),
        defineField({
            name : 'Subheading',
            description: 'A small review',
            type: 'text'
        }),
        defineField({
            name : 'Rating',
            description: 'Rate out of five',
            type: 'number',
            validation: (rule)=> rule.max(5).min(1),
            initialValue:5
        }),
        

    ]
})