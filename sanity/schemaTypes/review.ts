export default {
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    {
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      options: { weak: true },
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: { required: () => { (): any; new(): any; email: { (): any; new(): any; }; }; }) => Rule.required().email(),
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule: { required: () => { (): any; new(): any; regex: { (arg0: RegExp): any; new(): any; }; }; }) => Rule.required().regex(/^03\d{9}$/),
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): { (): any; new(): any; max: { (arg0: number): any; new(): any; }; }; new(): any; }; }; }) => Rule.required().min(1).max(5),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
  ],
}

