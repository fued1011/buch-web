import qs from "qs"
import { Buch } from "@/types/Buch"
import { Category } from "@/types/Category"

export async function getBuch(slug: string): Promise<Buch> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books?filters[slug][$eq]]=${slug}&populate=*`
  )

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch books")
  }

  return res.json()
}

export async function getAllCategories(): Promise<Category> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`
  )

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch categories")
  }

  return res.json()
}

export async function getFeaturedCategories(): Promise<Category> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?filters[featured][$eq]=true&sort=featured_order`
  )

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch categories")
  }

  return res.json()
}

export async function getBuecherBySlug(slug: string, limit = 25): Promise<Buch> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books?filters[categories][slug][$eq]]=${slug}&populate=*&pagination[limit]=${limit}`
  )

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch books")
  }

  return res.json()
}

export async function getBuecherByCategory(
  slug: string,
  pageNum = 1
): Promise<Buch> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books?filters[categories][slug][$eq]]=${slug}&populate=*&pagination[page]=${pageNum}&pagination[pageSize]=10`
  )

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch books")
  }

  return res.json()
}

export async function getBuecherByIds(ids: number[]): Promise<Buch> {
  const idArray = ids.length < 1 ? null : ids
  const query = qs.stringify(
    {
      filters: {
        id: {
          $in: idArray,
        },
      },
      populate: "*",
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  )

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books?${query}`
  )

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch books")
  }

  return res.json()
}

export async function getBuecherByTitle(searchTearm: string): Promise<Buch> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books?filters[title][$containsi]=${searchTearm}&populate=*`
  )

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch books")
  }

  return res.json()
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?filters[slug][$eq]]=${slug}&populate=*`
  )

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch books")
  }

  return res.json()
}

export async function getRelatedBuecher(
  author: number,
  categories: number[]
): Promise<Buch> {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/book/random?categories=${categories.toString()}&author=${author}`
  )

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch books")
  }

  return res.json()
}
