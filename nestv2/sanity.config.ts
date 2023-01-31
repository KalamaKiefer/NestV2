import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from '../schemas'

export default defineConfig({
  name: 'default',
  title: 'nestV2',

  projectId: 'izzur51q',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],
  basePath: `/studio`,
  schema: {
    types: schemaTypes,
  },
})
