import { makeAutoObservable } from 'mobx'
import { http } from '../../utils/http'
import { IMAGE_FILE_URL, IMAGE_URL, LAYER_URL } from '../../utils/consts'


export interface Layer {
    id: number,
    title: string,
    layer_set?: NeftImage[]
}


export interface NeftImage {
    id: number,
    title: string,
    layer: Layer,
    image?: {
        id: number,
        file: string,
    }
    file?: File,
    filePath?: string,
    remoteID?: number
}


class MainStore {

    layers: Layer[] = []
    currentLayer: Layer | null = null
    images: NeftImage[] = []
    currentImage: NeftImage | null = null

    constructor() {
        makeAutoObservable(this)
        document.cookie = 'csrftoken=g5tEmoV1PbPV0PyPHq7ORxHgBShokurlcSN8SV0NzGw1uZ3p5QeLYiM0sxgrFdoe; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/'
        document.cookie = 'sessionid=fdf4csn123d8sno3val0slkg4ncwbods; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/'
    }

    setCurrentLayer = (layer: Layer | null) => {
        this.currentLayer = layer
    }

    setCurrentImage = (image: NeftImage) => {
        this.currentImage = image
    }

    addLayer = async () => {
        const name = `Layer #${Math.round(Math.random() * 100).toString()}`

        const formData = new FormData()
        formData.append('title', name)
        formData.append('height', (this.layers.length + 1).toString())

        await http
            .post(LAYER_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((res) => {
                console.log(res)
                this.layers.push({
                    id: this.layers.length + 1,
                    title: name,
                })
                this.currentLayer = this.layers[this.layers.length - 1]
            })
            .catch((err) => console.error(err))
    }

    addImage = () => {
        this.images.push({
            id: this.images.length + 1,
            title: 'Image #' + Math.round(Math.random() * 1000).toString(),
            layer: this.currentLayer as Layer,
        })
    }

    uploadImageFileAndPath = async (file: File) => {
        if (this.currentImage) {
            this.currentImage.file = file
            this.currentImage.filePath = URL.createObjectURL(file)

            const imageFormData = new FormData()
            const collectionFormData = new FormData()
            imageFormData.append('image', file)

            // отправляем картинку
            await http.post(IMAGE_FILE_URL, imageFormData)
                .then((res) => {
                    console.log('image posted')
                    console.log(res.data)
                    collectionFormData.append('image_id', res.data.id)
                    collectionFormData.append('collection_id', this.currentLayer?.id.toString() ?? '')
                    collectionFormData.append('title', this.currentImage?.title ?? `Image #${Math.round(Math.random() * 1000).toString()}`)
                })
                .catch((err) => console.error(err))

            // connect to layer
            await http.post(IMAGE_URL, collectionFormData)
                .then((res) => {
                    console.log('connected with layer')
                    console.log(res)
                    this.images = []
                })
                .catch((err) => console.error(err))
        }
    }
}


export default MainStore
