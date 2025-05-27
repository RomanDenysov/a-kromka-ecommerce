'use client';

import { CategorySelector } from '@/components/features/admin/category/ui/category-selector';
import { AmountInput } from '@/components/shared/amount-input';
import { LoadingButton } from '@/components/shared/loading-button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { getSlug } from '@/lib/get-slug';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';
import { SelectedImagesDisplay } from './selected-images-display';
import { useCreateProductForm } from './use-create-product-form';

export function CreateProductForm() {
  const { form, onSubmit, isLoading } = useCreateProductForm();

  const handleImageSelectionChange = useCallback(
    (imageIds: string[]) => {
      form.setValue('imageIds', imageIds);
    },
    [form]
  );

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onBlur={(e) => {
                      e.preventDefault();
                      const value = e.target.value;
                      form.setValue('slug', getSlug(value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      e.preventDefault();
                      const value = getSlug(e.target.value);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  This is automatically generated from the product name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 gap-6 md:col-span-2 md:grid-cols-2">
            <div className="flex w-full flex-col gap-6">
              <div className="flex w-full items-start gap-4">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Category</FormLabel>
                      <CategorySelector
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              className="capitalize"
                              placeholder="Select a status"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full items-start gap-4">
                <FormField
                  control={form.control}
                  name="priceEuros"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <AmountInput
                          value={field.value}
                          onChange={(value: string | undefined) => {
                            field.onChange(value || '');
                          }}
                        />
                      </FormControl>
                      <FormDescription>Customer price in euros</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priceEurosInternal"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Internal Price</FormLabel>
                      <FormControl>
                        <AmountInput
                          value={field.value || ''}
                          onChange={(value: string | undefined) => {
                            field.onChange(value || '');
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        B2B/Internal pricing in euros
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="special-settings"
            >
              <AccordionItem value="optional-fields">
                <AccordionTrigger className="underline">
                  Optional Fields
                </AccordionTrigger>
                <AccordionContent className="flex w-full items-start gap-4">
                  <FormField
                    control={form.control}
                    name="inventory"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Inventory</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            value={field.value || ''}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === '') {
                                field.onChange(null);
                              } else {
                                const num = Number(value);
                                field.onChange(Number.isNaN(num) ? null : num);
                              }
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Leave empty for unlimited inventory
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sortOrder"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Sort Order</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="special-settings">
                <AccordionTrigger className="underline">
                  Special settings
                </AccordionTrigger>
                <AccordionContent className="flex w-full flex-col gap-4 py-2">
                  <FormField
                    control={form.control}
                    name="sellingZone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selling Zone</FormLabel>
                        <FormControl>
                          <ProductSaleZoneRadioGroup
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem
                          className={cn(
                            'flex flex-row items-center justify-between rounded-lg border p-4'
                          )}
                        >
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Active Product
                            </FormLabel>
                            <FormDescription>
                              Show this product in the store
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="isFeatured"
                      render={({ field }) => (
                        <FormItem
                          className={cn(
                            'flex flex-row items-center justify-between rounded-lg border p-4'
                          )}
                        >
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Featured Product
                            </FormLabel>
                            <FormDescription>
                              Show this product in featured sections
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <FormField
              control={form.control}
              name="imageIds"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Product Images</FormLabel>
                  <FormControl>
                    <SelectedImagesDisplay
                      initialImageIds={field.value || []}
                      onChange={handleImageSelectionChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex w-full items-center md:justify-end">
          <LoadingButton
            className="mt-6 w-full md:w-fit"
            type="submit"
            isLoading={isLoading}
          >
            Create Product
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}

function ProductSaleZoneRadioGroup({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const saleZones = [
    {
      id: 'b2c',
      label: 'B2C',
    },
    {
      id: 'b2b',
      label: 'B2B',
    },
    {
      id: 'b2b_b2c',
      label: 'B2B & B2C',
    },
  ];

  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="grid grid-cols-3"
    >
      {saleZones.map((saleZone) => (
        <div key={saleZone.id}>
          <RadioGroupItem
            id={saleZone.id}
            value={saleZone.id}
            className="peer sr-only"
          />
          <Label
            className="flex flex-col items-center justify-between rounded-md border-2 border-border bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary [&:has([data-state=checked])]:text-primary-foreground"
            htmlFor={saleZone.id}
          >
            {saleZone.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
