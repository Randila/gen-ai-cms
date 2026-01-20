import {defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons'

export const reviewType = defineType({
  name: 'Reviews',
  title: 'Reviews',
  type: 'document',
  description: 'Enter review data collected from surveys',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'Name',
      description: 'Name of the reviewer',
      type: 'string',
    }),
    defineField({
      name: 'Review_Type',
      description: 'Select the type of review',
      type: 'string',
      options: {
        list: [
          {title: 'Text Review', value: 'text'},
          {title: 'Video Review', value: 'video'},
        ],
        layout: 'radio',
      },
      initialValue: 'text',
    }),
    defineField({
      name: 'Heading',
      description: 'A heading for the review',
      type: 'string',
    }),
    defineField({
      name: 'Review_Video',
      description: 'Upload a testimonial video',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm,image/gif,image/webp',
      },
      hidden: ({document}) => document?.Review_Type === 'text',
      validation:(rule)=> rule.custom((value,context)=>{
        const reviewType = context.document?.Review_Type;
        if(reviewType === 'video'&& !value){
            return 'Video is required when review type is set to video';
        }
        return true;
      })
    }),
    defineField({
      name: 'Review',
      description: 'A small review',
      type: 'text',
      hidden: ({document}) => document?.Review_Type === 'video',
    }),
    defineField({
      name: 'Rating',
      description: 'Rate out of five',
      type: 'number',
      validation: (rule) => rule.max(5).min(1),
      initialValue: 5,
      hidden: ({document}) => document?.Review_Type === 'video',
    }),
  ],
})
