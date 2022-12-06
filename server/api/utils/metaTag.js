import fetch from 'node-fetch';

import parser from 'node-html-parser';

const escapeHTML = str => str.replace(/[&<>'"]/g,
  tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag]));

async function getMetaTags(url) {
  let titleTag, imageTag, altTag, videoTag, result
  let metaContent = {}

  const getSchoolIcon = function (image, schoolName, backupImageTag) {
    if (image) {
      image = escapeHTML(image)
    }
    if (!image && !backupImageTag) {
      image = ""
      altTag = "default-school image"
    }
    if (!altTag) {
      altTag = schoolName.concat(" Logo")
    }
    return image ? image : backupImageTag
  }

  const getSchoolVideo = function (video, backupVideo) {
    if (video) {
      video = escapeHTML(video)
    }
    if (!backupVideo) {
      return ""
    }
    let videoToPlay = video ? video : backupVideo
    return videoToPlay
  }

  try {
    const getSchoolName = function (title, backupTitleTag) {
      if (title) {
        title = escapeHTML(title)
      }
      if (title.includes('-')) {
        title = title.split('-')[1].trim()
      }
      let titleToDisplay = title ? title : backupTitleTag
      return titleToDisplay
    }
    let response = await fetch(url)
    let pageContent = await response.text()
    let htmlPage = parser.parse(pageContent)
    if (htmlPage.querySelector(".custom-logo")) { // check for school img
      imageTag = htmlPage.querySelector(".custom-logo")._attrs.src
      altTag = htmlPage.querySelector(".custom-logo")._attrs.alt
    }

    if (htmlPage.querySelector("picture > img")) { // check for school img
      imageTag = htmlPage.querySelector("picture > img")._attrs["data-image-sizes"]
      imageTag = JSON.parse(decodeURI(imageTag))[0].url
      altTag = htmlPage.querySelector("picture > img")._attrs.alt
    }

    if (htmlPage.querySelector("title")) { // check school name
      titleTag = htmlPage.querySelector("title").textContent
    }

    if (htmlPage.querySelector("video[data-default-url]"))  { // check school video
      let video = htmlPage.querySelector("video[data-default-url]")
      videoTag = video.getAttribute("data-default-url")
    }
    let metaTags = htmlPage.querySelectorAll(`meta[property='og:title'],
                                              meta[property='og:image'],
                                              meta[property='og:video']`)
    metaTags.forEach(item => {
      let key = item._attrs.property.split(':')[1]
      metaContent[key] = item._attrs.content
    })
    let schoolName = getSchoolName(metaContent.title, titleTag)
    let schoolImg = {
      src: getSchoolIcon(metaContent.image, schoolName, imageTag),
      alt: altTag
    }
    let schoolVid = getSchoolVideo(metaContent.video, videoTag)
    return [schoolName, schoolImg, schoolVid]
  } catch (e) {
    return e.message
  }
}

export default getMetaTags;