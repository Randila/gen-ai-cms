import {defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'
export const activityType = defineType({
  name: 'Student_Activity',
  title: 'Student Activity',
  type: 'document',
  groups: [
    {name: 'activity_card', title: 'Activity Card', default: true},
    {name: 'activity_body', title: 'Activity Body'},
  ],
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Title of the Activity.',
      validation: (rule) => rule.required(),
      group: 'activity_card',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required().error(`Required to generate a page for the blog`),
      group: 'activity_card',
    }),
    defineField({
      name: 'Date',
      type: 'date',
      description: 'date of publication',
      validation:(rule) => rule.required(),
      group: 'activity_card',
    }),
    defineField({
      name: 'Excerpt',
      type: 'string',
      description: 'Small description about the activity',
      validation:(rule) => rule.required(),
      group: 'activity_card',
    }),
    defineField({
      name: 'Activity_Thumbnail',
      type: 'image',
      description: 'image for activity tile',
      validation: (rule) => rule.required(),
      group: 'activity_card',
    }),
    defineField({
      name: 'Activity_Video',
      type: 'file',
      description: 'Main video of the Activity',
      options: {
        accept: 'video/mp4,video/webm,image/gif,image/webp,image/png,image/jpg,image/jpeg',
      },
      validation:(rule) => rule.required(),
      group: 'activity_body',
    }),
    defineField({
      name: 'Activity_Content',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Enter the description about the activity in Rich Text',
      group: 'activity_body',
    }),
  ],
})
