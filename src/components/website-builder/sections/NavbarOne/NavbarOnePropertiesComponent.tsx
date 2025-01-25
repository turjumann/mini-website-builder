import type { CustomNavbarOneInstance } from "@/components/website-builder/sections/NavbarOne/NavbarOne"
import { type SectionElementInstance } from "@/components/website-builder/sections/SectionElements"
import React, { useEffect, useState } from "react"
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
import { Trash2 } from "lucide-react"

const propertiesSchema = z.object({
  logoText: z
    .string()
    .min(2, { message: "Logo text must be at least 2 characters long" })
    .max(10, { message: "Logo text cannot exceed 10 characters" }),
  navbarItems: z
    .array(z.string().min(1, { message: "Navbar item cannot be empty" }))
    .min(1, { message: "At least one navbar item is required" })
    .max(6, { message: "You can have a maximum of 6 navbar items" }),
  bgColor: z
    .string()
    .min(3, { message: "Background color must be at least 3 characters long" })
    .max(7, { message: "Background color cannot exceed 7 characters" })
    .regex(/^#/, { message: "Background color must start with #" })
    .optional()
    .or(z.literal("")),
  textColor: z
    .string()
    .min(3, { message: "Text color must be at least 3 characters long" })
    .max(7, { message: "Text color cannot exceed 7 characters" })
    .regex(/^#/, { message: "Text color must start with #" })
    .optional()
    .or(z.literal("")),
})

type NavbarOnePropertiesSchema = z.infer<typeof propertiesSchema>

const NavbarOnePropertiesComponent = ({
  elementInstance,
}: {
  elementInstance: SectionElementInstance
}) => {
  const element = elementInstance as CustomNavbarOneInstance

  const { updateElement, setSelectedElement } = useBuilder()

  const [navbarItems, setNavbarItems] = useState<string[]>(
    element.instanceProperties.navbarItems
  )

  const form = useForm<NavbarOnePropertiesSchema>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      logoText: element.instanceProperties.logoText,
      navbarItems: element.instanceProperties.navbarItems,
      bgColor: element.instanceProperties.bgColor,
      textColor: element.instanceProperties.textColor,
    },
  })

  useEffect(() => {
    form.reset({
      ...element.instanceProperties,
      navbarItems: navbarItems,
    })
  }, [form, element, navbarItems])

  function applyChanges(values: NavbarOnePropertiesSchema) {
    const currElement = updateElement(element.id, {
      ...element,
      instanceProperties: {
        ...values,
        navbarItems: navbarItems,
      },
    })
    setSelectedElement(currElement)
  }

  const addNavbarItem = () => {
    if (navbarItems.length < 6) {
      setNavbarItems([...navbarItems, ""])
    }
  }

  const removeNavbarItem = (index: number) => {
    const updatedItems = navbarItems.filter((_, i) => i !== index)
    setNavbarItems(updatedItems)
  }

  const updateNavbarItem = (index: number, value: string) => {
    const updatedItems = [...navbarItems]
    updatedItems[index] = value
    setNavbarItems(updatedItems)
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
          name="logoText"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Write your Logo name here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col">
          <FormLabel>Navbar Items</FormLabel>
          {navbarItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <Input
                value={item}
                onChange={(e) => updateNavbarItem(index, e.target.value)}
                onBlur={() => form.trigger("navbarItems")}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeNavbarItem(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={addNavbarItem}
            disabled={navbarItems.length >= 6}
          >
            Add Navbar Item
          </Button>
          <FormMessage>
            {form.formState.errors.navbarItems?.message}
          </FormMessage>
        </div>

        <Controller
          name="navbarItems"
          control={form.control}
          render={({ field }) => (
            <input
              type="hidden"
              {...field}
              value={JSON.stringify(navbarItems)}
            />
          )}
        />

        <FormField
          control={form.control}
          name="bgColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Background Color</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Input {...field} placeholder="#FFFFFF" />
                  <div className=" w-14 h-10 overflow-hidden relative rounded-md p-0 border border-border">
                    <Input
                      type="color"
                      value={field.value || "#ffffff"}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="cursor-pointer absolute -top-2 -left-1 w-14 h-14 p-0 border-none shadow-none"
                    />
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Enter a valid hex color code or pick a color
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="textColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text Color</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Input {...field} placeholder="#FFFFFF" />
                  <div className=" w-14 h-10 overflow-hidden relative rounded-md p-0 border border-border">
                    <Input
                      type="color"
                      value={field.value || "#ffffff"}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="cursor-pointer absolute -top-2 -left-1 w-14 h-14 p-0 border-none shadow-none"
                    />
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Enter a valid hex color code or pick a color
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Apply Changes</Button>
      </form>
    </Form>
  )
}

export default NavbarOnePropertiesComponent
