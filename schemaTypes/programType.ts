import {defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons'

export const programType = defineType({
  name: 'program',
  title: 'Programs',
  type: 'document',
  groups: [
    {name: 'course_header', title: 'Course Header', default:true},
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
      name: 'Background_Image',
      description: 'Set a background image for the course.',
      type: 'image',
      group: 'course_header',
    }),
    defineField({
      name: 'subheading',
      type: 'string',
      group: 'course_header',
    }),
    defineField({
      name: 'Rich_Description',
      type: 'array',
      description: 'Added temporarly for testing purposes.',
      of: [{type: 'block'}],
      group: 'course_header',
    }),
    defineField({
      name: 'Lesson_Content',
      description: 'Add points for the "What you will learn section"',
      type: 'array',
      of: [{type: 'string'}],
      group: 'course_body',
    }),
    defineField({
      name: 'Course_Content',
      description: 'Contains Lesson Data',
      group: 'course_body',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'Section_Title',
              description: 'Enter course section name',
              type: 'string',
            }),
            defineField({
              name: 'Lesson_Data',
              description: 'Enter data for each lesson',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'Lesson_Name',
                      description: 'Enter each Lesson name',
                      type: 'string',
                    }),
                    defineField({
                      name: 'Lesson_Duration',
                      description: 'Enter Lesson Duration',
                      type: 'number',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'Lesson_Name',
                      subtitle: 'Lesson_Duration',
                    },
                    prepare(selection) {
                      const {title, subtitle} = selection
                      return {
                        title: title,
                        duration: subtitle ? `${subtitle} min` : 'No duration set',
                      }
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'Section_Title',
              lessons: 'Lesson_Data',
            },
            prepare(selection) {
              const {title, lessons} = selection
              return {
                title: title,
                subtitle: `${lessons?.length || 0} lessons`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'Cource_Requirements',
      description: 'Requirements to take the course',
      type: 'array',
      of: [{type: 'string'}],
      group: 'course_body'
    }),
    defineField({
      name: 'Course_Description',
      type: 'array',
      of: [{type: 'block'}],
      group: 'course_body'
    }),
    defineField({
      name: 'Actual_Price',
      description: 'Actual price of the course without discounts',
      type: 'number',
      group: 'pricing_card',
      initialValue:0,
      validation: (rule) =>
        rule.min(0).required().info('The Price required and it has to be more than 0'),
    }),
    defineField({
      name: 'Discount',
      description: 'Discount percentage (Enter as a number)',
      type: 'number',
      group: 'pricing_card',
      initialValue:0,
      validation: (rule) => rule.min(0).max(100).error('Discount value has to be between 0 - 100'),
    }),
    // defineField({
    //   name: 'Final_Price',
    //   type: 'number',
    //   description: 'Defaults to Actual price if not changed manually',
    //   group: 'pricing_card',
    //   initialValue: ({document}) => document?.Actual_Price,
    //   validation:(rule)=> rule.required().min(0)
    // }),
    defineField({
        name:'Course_Image',
        description:'Main image for the course (visible within the card)',
        type:'image',
        validation:(rule)=> rule.required().error("Required for the course card!"),
        group:'pricing_card',
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
      validation:(rule)=>rule.required(),
    }),
  ],
})
