import { defineField, defineType } from "sanity";
import { BellIcon } from "@sanity/icons";

export const announcementType = defineType({
    name : 'announcement',
    title : 'Announcement',
    type : 'document',
    icon : BellIcon ,
    fields : [
        defineField({
            name : 'Announcement',
            description : 'Enter announements one by one',
            type : 'string',
        })
    ],
})


