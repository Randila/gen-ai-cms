import {defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons'
import {DiscountedPriceInput} from '../componenets/discountedPriceInput'

export const programType = defineType({
  name: 'program',
  title: 'Programs',
  type: 'document',
  groups: [
    {name: 'course_header', title: 'Course Header', default: true},
    {name: 'course_body', title: 'Course Body'},
    {name: 'pricing_card', title: 'Pricing Card'},
  ],
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'course_header',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required().error(`Required to generate a page on the website.`),
      group: 'course_header',
    }),
    defineField({
      name: 'Course_Thumbnail',
      description: 'Set an image for the course thumbnail.',
      type: 'image',
      group: 'course_header',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'Subheading',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'course_header',
    }),
    defineField({
      name: 'Text_Color',
      description: 'Enter a text color for the course card',
      type: 'color',
      options: {
        disableAlpha: false,
      },
      validation: (rule) =>
        rule.required().error('Enter the color of text you want inside the course card'),
      group: 'course_header',
    }),
    defineField({
      name: 'Bg_Color',
      title: 'Background Color',
      description: 'Enter a background color for the course card',
      type: 'color',
      options: {
        disableAlpha: false,
      },
      validation: (rule) =>
        rule.required().error("Enter the color of the thumbnail image you're using for the card"),
      group: 'course_header',
    }),
    defineField({
      name: 'Background_Image',
      description: 'Set a background image for the course.',
      type: 'image',
      group: 'course_body',
    }),
    // defineField({
    //   name: 'Small_Description',
    //   description: 'Small description about the course to be displayed inside the individual course page',
    //   type: 'string',
    //   group: 'course_body',
    // }),
    // defineField({
    //   name: 'Lesson_Content',
    //   description: 'Add points for the "What you will learn section"',
    //   type: 'array',
    //   of: [{type: 'string'}],
    //   validation:(rule)=>rule.required(),
    //   group: 'course_body',
    // }),
    // defineField({
    //   name: 'Course_Content',
    //   description: 'Contains Lesson Data',
    //   group: 'course_body',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'object',
    //       fields: [
    //         defineField({
    //           name: 'Section_Title',
    //           description: 'Enter course section name',
    //           type: 'string',
    //         }),
    //         defineField({
    //           name: 'Lesson_Data',
    //           description: 'Enter data for each lesson',
    //           type: 'array',
    //           of: [
    //             {
    //               type: 'object',
    //               fields: [
    //                 defineField({
    //                   name: 'Lesson_Name',
    //                   description: 'Enter each Lesson name',
    //                   type: 'string',
    //                 }),
    //                 defineField({
    //                   name: 'Lesson_Duration',
    //                   description: 'Enter Lesson Duration',
    //                   type: 'number',
    //                 }),
    //               ],
    //               preview: {
    //                 select: {
    //                   title: 'Lesson_Name',
    //                   subtitle: 'Lesson_Duration',
    //                 },
    //                 prepare(selection) {
    //                   const {title, subtitle} = selection
    //                   return {
    //                     title: title,
    //                     duration: subtitle ? `${subtitle} min` : 'No duration set',
    //                   }
    //                 },
    //               },
    //             },
    //           ],
    //         }),
    //       ],
    //       preview: {
    //         select: {
    //           title: 'Section_Title',
    //           lessons: 'Lesson_Data',
    //         },
    //         prepare(selection) {
    //           const {title, lessons} = selection
    //           return {
    //             title: title,
    //             subtitle: `${lessons?.length || 0} lessons`,
    //           }
    //         },
    //       },
    //     },
    //   ],
    // }),

    defineField({
      name: 'Course_Description',
      type: 'array',
      of: [{type: 'block'}],
      group: 'course_body',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'Typical_Age',
      description: 'Recommended age to enroll the age',
      type: 'object',
      fields: [
        defineField({
          name: 'Minimum_Age',
          description: 'Enter a minimum age the student can enroll',
          type: 'number',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'Max_Age',
          description: 'Enter a maximum age of the student can enroll',
          type: 'number',
          validation: (rule) => rule.required(),
        }),
      ],
      group: 'course_body',
      // validation: (rule) => rule.required(),
      // readOnly :({document})=> (document?.Typical_Age as unknown[])?.length > 0 ,
    }),
    defineField({
      name: 'Skills_Developed',
      description: 'Lists of Technical & Soft Skills developed in the course.',
      type: 'object',
      fields : [
        defineField({
          name : 'Technical_Skils',
          description : 'List of technical skills gained from the course.',
          type : 'array',
          of :[{type : 'string'}] 
        }),
        defineField({
          name : 'Soft_Skills',
          description : 'List of soft skills gained from the course.',
          type : 'array',
          of :[{type : 'string'}] 
        }),        
      ],
      group: 'course_body',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'Cource_Requirements',
      description: 'Requirements to take the course',
      type: 'array',
      of: [{type: 'string'}],
      group: 'course_body',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'Next_Course',
      description: 'Recommend a next course',
      type: 'reference',
      to : [{type : 'program'}],
      group: 'course_body',
    }),
    

    defineField({
      name: 'Actual_Price',
      description: 'Actual price of the course without discounts',
      type: 'number',
      group: 'pricing_card',
      initialValue: 0,
      validation: (rule) =>
        rule.min(0).required().info('The Price required and it has to be more than 0'),
    }),
    defineField({
      name: 'Enable_Discount',
      description: 'Enable or disable a discount for the course',
      type: 'boolean',
      initialValue: false,
      group: 'pricing_card',
    }),
    defineField({
      name: 'Discounted_Price',
      description: 'Discount percentage (Enter as a number)',
      type: 'number',
      group: 'pricing_card',
      initialValue: ({document}) => document?.Actual_Price,
      readOnly: ({document}) => !document?.Enable_Discount,
      components: {
        input: DiscountedPriceInput,
      },
      validation: (rule) =>
        rule.custom((value, context) => {
          const doc = context.document

          if (!doc?.Enable_Discount) {
            return true
          }

          if (value === undefined || value === null) {
            return 'Discounted price is required when discount is enabled'
          }

          const actualPrice = (doc?.Actual_Price as number) || 0
          if (value >= actualPrice) {
            return `Discounted price must be less than actual price : $${actualPrice}`
          }

          if (value <= 0) {
            return 'Discounted price must be greater than 0'
          }

          return true
        }),
    }),
    defineField({
      name: 'Course_Image',
      description: 'Main image for the course (visible within the card)',
      type: 'image',
      validation: (rule) => rule.required().error('Required for the course card!'),
      group: 'pricing_card',
    }),
    defineField({
      name: 'Course_Features',
      description: 'Features highlighted within the price card',
      group: 'pricing_card',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
})
