"use client"
import firebaseapp from "@/libs/firebase"
import { Button } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Product } from "@prisma/client"
import React, { useCallback } from "react"
import { getStorage, ref, deleteObject } from "firebase/storage"

interface ManageClientProps {
    products: Product[]
}

const ManageClient: React.FC<ManageClientProps> = ({ products }) => {
    const storage = getStorage(firebaseapp)

    let rows: any = []
    if (products) {
        rows = products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                // image: product.image // image alanı eklendi
            }
        })
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'price', headerName: 'Price', width: 200 },
        { field: 'category', headerName: 'Category', width: 200 },
        { field: 'brand', headerName: 'Brand', width: 200 },
        {
            field: 'inStock', headerName: 'Stock Status', width: 200,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.inStock ? "Stokta Mevcut" : "Stokta Mevcut Değil"}
                    </div>
                )
            }
        },
        {
            field: 'actions', headerName: 'Actions', width: 200,
            renderCell: (params) => {
                return (
                    <Button
                        onClick={() => handleDelete(params.row.id, params.row.image)}
                        className="mx-4 text-red-500 cursor-pointer"
                    >
                        Sil
                    </Button>
                )
            }
        }
    ]

    const handleDelete = useCallback(async (id: string, image: string) => {
        try {
            const imageRef = ref(storage, image)
            await deleteObject(imageRef)
            console.log("resim silindi")
        } catch (error) {
            console.log('Bir hata mevcut', error)
        }
    },
        [storage])

    return (
        <div>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 }
                    }
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </div>
    )
}

export default ManageClient
