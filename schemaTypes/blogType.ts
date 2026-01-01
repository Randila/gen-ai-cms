import { defineField, defineType } from "sanity";

export const blogType = defineType({
    name: 'Blog',
    title : 'Blogs',
    type : 'document',
    groups :[
        {name : 'blog_card' , title : 'Blog Card', default:true},
        {name : 'blog_body' , title : 'Blog Body'},
    ],
    fields : [
        defineField({
            name : 'title',
            type : 'string',
            description : 'Title of the Blog.',
            validation:(rule) => rule.required(),
            group: 'blog_card',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options:{source : 'title'},
            validation:(rule)=>rule.required().error(`Required to generate a page for the blog`),
            group : 'blog_card'
        }),
        defineField({
            name : 'subheading',
            type : 'string',
            description : 'subheading for the blog tile',
            // validation:(rule) => rule.required(),
            group: 'blog_card',
        }),
        defineField({
            name : 'Blog_Thumbnail',
            type : 'image',
            description : 'image for blog tile',
            validation:(rule) => rule.required(),
            group: 'blog_card',
        }),
        defineField({
            name : 'Date',
            type : 'date',
            description : 'date of publication',
            // validation:(rule) => rule.required(),
            group: 'blog_card',
        }),
        defineField({
            name : 'Read_Time',
            type : 'number',
            initialValue: 1,
            description : 'Estimated time to read the whole blog (Enter in minutes)',
            // validation:(rule) => rule.required(),
            group: 'blog_card',
        }),
        defineField({
            name : 'Blog_Image',
            type : 'image',
            description : 'Main background image for the blog.',
            // validation:(rule) => rule.required(),
            group: 'blog_body',
        }),
        defineField({
            name : 'Blog_Content',
            type : 'array',
            of : [{type : 'block'}],
            description : 'write your blog post',
            group: 'blog_body',
        })
    ]
});