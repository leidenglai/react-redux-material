import AV from 'avoscloud-sdk'

const HomeRecommendation = AV.Object.extend('HomeRecommendation')

/**
 * Class Methods
 */

HomeRecommendation.fetchAll = function (page = 1, perPage = 15) {
    const query = new AV.Query(HomeRecommendation)
    const countQuery = new AV.Query(HomeRecommendation)

    query.addDescending('createdAt')
    query.limit(perPage)
    query.skip(perPage * (page - 1))
    query.include('user')

    return AV.Promise.when(query.find(), countQuery.count())
}

HomeRecommendation.add = function (kind, object) {
    const query = new AV.Query(HomeRecommendation)

    query.equalTo('kind', kind)
    if (kind === 'user') {
        query.equalTo('user', object)
    }

    return query.first().then(function (homeRecommendation) {
        if (homeRecommendation) {
            homeRecommendation.destroy()
        }

        const newHomeRecommendation = new HomeRecommendation()
        newHomeRecommendation.set('kind', kind)

        if (kind === 'user') {
            newHomeRecommendation.set('user', object)
        }

        return newHomeRecommendation.save()
    })
}

/**
 * Instance Methods
 */

Object.assign(HomeRecommendation.prototype, {
    updateUserBackgroundImage(imageFile) {
        const user = this.get('user')

        return resizeImageFile(imageFile, 600, 300).then(function (imageBase64Data) {
            const avFile = new AV.File("backgroundImage.png", {base64: imageBase64Data})

            return avFile.save()
        }).then(function (fileObject) {
            user.set('userCardBackgroundImage', fileObject)

            return user.save()
        }).then(function () {
            return this
        })
    },

    top() {
        this.destroy()
        const homeRecommendation = new HomeRecommendation()

        homeRecommendation.set('kind', 'user')
        homeRecommendation.set('user', this.get('user'))

        return homeRecommendation.save()
    }
})

function resizeImageFile(imageFile, targetWidth, targetHeight) {
    const image = new Image()
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    canvas.style.visibility = "hidden"
    canvas.width = targetWidth
    canvas.height = targetHeight
    document.body.appendChild(canvas)

    return new AV.Promise(function (resolve, reject) {
        image.src = URL.createObjectURL(imageFile)

        image.onload = function () {
            if (this.width < targetWidth || this.height < targetHeight) {
                const alertString = `图片大小至少为 ${targetWidth} x ${targetHeight}`

                reject(alertString)
                window.alert(alertString)
                return
            }

            let sx, sy, sWidth, sHeight;

            if (this.width > 2 * this.height) {
                sWidth = 2 * this.height
                sHeight = this.height
                sx = (this.width - sWidth) / 2
                sy = 0
            } else {
                sWidth = this.width
                sHeight = sWidth / 2
                sx = 0
                sy = (this.height - sHeight) / 2
            }

            // See: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
            context.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight)

            const imageBase64Data = canvas.toDataURL().split('base64,')[1]

            resolve(imageBase64Data)
        }
    })
}

export default HomeRecommendation
