import { type SectionElementInstance } from "@/components/website-builder/sections/section-elements"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import useBuilder from "@/hooks/use-builder"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import {
  CustomFooterInstance,
  footerInstanceProperties,
} from "@/components/website-builder/sections/footer/common/constants"
import { validateLink } from "@/lib/utils"

// Define the schema for a single link
const linkSchema = z.object({
  title: z.string().min(1, { message: "Link title cannot be empty" }),
  link: z.string().min(1, { message: "Link URL cannot be empty" }),
})

// Define the schema for a column
const columnSchema = z.object({
  title: z.string().min(1, { message: "Column title cannot be empty" }),
  links: z.array(linkSchema),
})

// Define the schema for the footer instance properties
export const footerPropertiesSchema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty" }),
  description: z.string().min(1, { message: "Description cannot be empty" }),
  fbLink: z
    .string()
    .refine(validateLink, {
      message: "Facebook link must be a valid URL",
    })
    .optional()
    .or(z.literal("")),
  xLink: z
    .string()
    .refine(validateLink, {
      message: "X (Twitter) link must be a valid URL",
    })
    .optional()
    .or(z.literal("")),
  insLink: z
    .string()
    .refine(validateLink, {
      message: "Instagram link must be a valid URL",
    })
    .optional()
    .or(z.literal("")),
  lnLink: z
    .string()
    .refine(validateLink, {
      message: "LinkedIn link must be a valid URL",
    })
    .optional()
    .or(z.literal("")),
  cols: z.array(columnSchema),
  footerBottom: z
    .string()
    .min(1, { message: "Footer bottom text cannot be empty" }),
})

// Infer the type for the schema
export type FooterPropertiesSchema = z.infer<typeof footerPropertiesSchema>

type Column = (typeof footerInstanceProperties.cols)[0]

const FooterPropertiesComponent = ({
  elementInstance,
}: {
  elementInstance: SectionElementInstance
}) => {
  const element = elementInstance as CustomFooterInstance
  const { updateElement, setSelectedElement } = useBuilder()

  const [cols, setCols] = useState<Column[]>(element.instanceProperties.cols)

  const form = useForm<FooterPropertiesSchema>({
    resolver: zodResolver(footerPropertiesSchema),
    mode: "onBlur",
    defaultValues: {
      title: element.instanceProperties.title,
      description: element.instanceProperties.description,
      fbLink: element.instanceProperties.fbLink,
      xLink: element.instanceProperties.xLink,
      insLink: element.instanceProperties.insLink,
      lnLink: element.instanceProperties.lnLink,
      cols: element.instanceProperties.cols,
      footerBottom: element.instanceProperties.footerBottom,
    },
  })

  useEffect(() => {
    form.reset({
      ...element.instanceProperties,
      cols,
    })
  }, [form, element, cols])

  const applyChanges = (values: FooterPropertiesSchema) => {
    const currElement = updateElement(element.id, {
      ...element,
      instanceProperties: {
        ...values,
        cols,
      },
    })
    setSelectedElement(currElement)
  }

  const addColItem = () => {
    const newCol: Column = {
      title: "New Column",
      links: [{ title: "New Link", link: "#" }],
    }
    setCols((prevCols) => [...prevCols, newCol])
  }

  const removeColItem = (colIndex: number) => {
    setCols((prevCols) => prevCols.filter((_, index) => index !== colIndex))
  }

  const updateColItem = (colIndex: number, updatedCol: Column) => {
    setCols((prevCols) =>
      prevCols.map((col, index) => (index === colIndex ? updatedCol : col))
    )
  }

  const addLinkToCol = (colIndex: number) => {
    const newLink = { title: "New Link", link: "#" }
    setCols((prevCols) =>
      prevCols.map((col, index) =>
        index === colIndex ? { ...col, links: [...col.links, newLink] } : col
      )
    )
  }

  const removeLinkFromCol = (colIndex: number, linkIndex: number) => {
    setCols((prevCols) =>
      prevCols.map((col, index) =>
        index === colIndex
          ? { ...col, links: col.links.filter((_, idx) => idx !== linkIndex) }
          : col
      )
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit(applyChanges)()
        }}
        className="space-y-4"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Social Links */}
        <FormField
          control={form.control}
          name="fbLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facebook Link</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="xLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>X (Twitter) Link</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="insLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram Link</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lnLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn Link</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Columns */}
        <div className="space-y-4 flex flex-col">
          <FormLabel>Columns</FormLabel>
          {cols.map((col, colIndex) => (
            <div key={colIndex} className="space-y-2 border p-4 rounded-md">
              <FormField
                control={form.control}
                name={`cols.${colIndex}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Column Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          updateColItem(colIndex, {
                            ...col,
                            title: e.target.value,
                          })
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Links in Column */}
              <div className="space-y-2 flex flex-col">
                <FormLabel>Links</FormLabel>
                {col.links.map((link, linkIndex) => (
                  <div key={linkIndex} className="flex items-center space-x-2">
                    <Input
                      value={link.title}
                      onChange={(e) => {
                        const updatedLinks = col.links.map((l, idx) =>
                          idx === linkIndex
                            ? { ...l, title: e.target.value }
                            : l
                        )
                        updateColItem(colIndex, { ...col, links: updatedLinks })
                      }}
                    />
                    <Input
                      value={link.link}
                      onChange={(e) => {
                        const updatedLinks = col.links.map((l, idx) =>
                          idx === linkIndex ? { ...l, link: e.target.value } : l
                        )
                        updateColItem(colIndex, { ...col, links: updatedLinks })
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLinkFromCol(colIndex, linkIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addLinkToCol(colIndex)}
                >
                  Add Link
                </Button>
              </div>

              {/* Remove Column Button */}
              <div className="w-full flex">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="ml-auto"
                  onClick={() => removeColItem(colIndex)}
                >
                  Remove Column
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addColItem}
          >
            Add Column
          </Button>
        </div>

        {/* Footer Bottom Text */}
        <FormField
          control={form.control}
          name="footerBottom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Footer Bottom Text</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">Apply Changes</Button>
      </form>
    </Form>
  )
}

export default FooterPropertiesComponent
