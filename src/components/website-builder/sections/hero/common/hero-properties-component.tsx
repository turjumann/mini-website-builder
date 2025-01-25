import { type SectionElementInstance } from "@/components/website-builder/sections/section-elements"
import React, { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import useBuilder from "@/hooks/use-builder"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CustomHeroInstance } from "@/components/website-builder/sections/hero/common/constants"
import { Textarea } from "@/components/ui/textarea"
import { validateLink } from "@/lib/utils"

const propertiesSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Title must be at least 4 characters long" })
    .max(30, { message: "Title cannot exceed 30 characters" }),

  body: z
    .string()
    .min(4, { message: "Body must be at least 4 characters long" }),

  primaryBtnText: z
    .string()
    .min(4, {
      message: "Primary button text must be at least 4 characters long",
    })
    .max(30, { message: "Primary button text cannot exceed 30 characters" }),

  primaryBtnLink: z
    .string()
    .refine(validateLink, {
      message: "Primary button link must be a valid URL",
    })
    .optional()
    .or(z.literal("")),
  secondaryBtnText: z
    .string()
    .min(4, {
      message: "Secondary button text must be at least 4 characters long",
    })
    .max(30, { message: "Secondary button text cannot exceed 30 characters" }),

  secondaryBtnLink: z
    .string()
    .refine(validateLink, {
      message: "Secondary button link must be a valid URL",
    })
    .optional()
    .or(z.literal("")),

  imageLink: z
    .string()
    .refine(validateLink, {
      message:
        "Image link must be a valid URL, a relative path starting with '/', or a single '#'",
    })
    .optional()
    .or(z.literal("")),
})

type HeroPropertiesSchema = z.infer<typeof propertiesSchema>

const HeroPropertiesComponent = ({
  elementInstance,
}: {
  elementInstance: SectionElementInstance
}) => {
  const element = elementInstance as CustomHeroInstance

  const { updateElement, setSelectedElement } = useBuilder()

  const form = useForm<HeroPropertiesSchema>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      title: element.instanceProperties.title,
      body: element.instanceProperties.body,
      primaryBtnText: element.instanceProperties.primaryBtnText,
      primaryBtnLink: element.instanceProperties.primaryBtnLink,
      secondaryBtnText: element.instanceProperties.secondaryBtnText,
      secondaryBtnLink: element.instanceProperties.secondaryBtnLink,
      imageLink: element.instanceProperties.imageLink,
    },
  })

  useEffect(() => {
    form.reset({
      ...element.instanceProperties,
    })
  }, [form, element])

  function applyChanges(values: HeroPropertiesSchema) {
    const currElement = updateElement(element.id, {
      ...element,
      instanceProperties: {
        ...values,
      },
    })
    setSelectedElement(currElement)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit(applyChanges)()
        }}
        onBlur={form.handleSubmit(applyChanges)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Write your title here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Textarea {...field} rows={5} />
              </FormControl>
              <FormDescription>Write your description here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="primaryBtnText"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Primary Button Text</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Text for primary button</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="primaryBtnLink"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Primary Button Link</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>URL for primary button</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secondaryBtnText"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Secondary Button Text</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Text for secondary button</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secondaryBtnLink"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Secondary Button Link</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>URL for secondary button</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageLink"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Image Link</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>URL for hero image</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Apply Changes</Button>
      </form>
    </Form>
  )
}

export default HeroPropertiesComponent
