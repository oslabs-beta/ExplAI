'use client';

import Image from 'next/image';
import styles from './page.module.css';
// import { uploadImage } from './lib/actions';
import { lazy, Suspense, useState, useEffect, ChangeEvent } from 'react';
// import Heatmap from './ui/heatmap';
import Modal from './ui/modal';

const Heatmap = lazy(() => import('./ui/heatmap'));

let inputImage: File | undefined;

export default function Home() {
  const [imgName, setImgName] = useState('Browse...');
  const [imgURL, setImgURL] = useState('');
  const [viz, openViz] = useState(false);

  const browse = (e: ChangeEvent<HTMLInputElement>) => {
    inputImage = e.currentTarget.files?.[0];
    setImgName(`File Name:  ${inputImage?.name}`);
  };

  const uploadClick = () => {
    if (inputImage) setImgURL(URL.createObjectURL(inputImage as File));
  };

  const clearClick = () => {
    inputImage = undefined;
    setImgName('Browse...');
    setImgURL('');
  };

  const vizClick = () => {
    openViz(true);
  };

  const closeViz = () => {
    openViz(false);
  };

  return (
    <main className={styles.main}>
      <Image
        src='/logoBlack.png'
        alt='Logo'
        className={styles.Logo}
        width={396}
        height={512}
        priority
      />

      <div className={styles.majorDiv}>
        <div className={styles.title}>
          <img className={styles.titleImg} src='/title.png' alt='titleText' />
        </div>

        <div className={styles.inputBox}>
          {viz && <Modal closeViz={closeViz} />}

          {imgURL && (
            <img
              className={styles.uploadImg}
              src={imgURL}
              alt='UploadedImage'
            />
          )}
          {!imgURL && (
            <p className={styles.placeholderText}>Waiting for image</p>
          )}

          <div>
            {imgURL && (
              <button className={styles.primaryBtn} onClick={vizClick}>
                Analysis Visualization
              </button>
            )}
          </div>

          <div className={styles.buttonBox}>
            {/* <form action={uploadImage}>
            <input id='image' name='image'type='file' accept='image/*' />
            <button type='submit'>Upload</button>
          </form> */}
            <label className={styles.imgInput}>
              <text>{imgName}</text>
              <input
                className={styles.hide}
                name='image'
                type='file'
                accept='image/*'
                onChange={(e) => browse(e)}
              />
            </label>
            <button
              className={styles.primaryBtn}
              id='upload'
              onClick={uploadClick}
            >
              Upload
            </button>
            <button className={styles.altBtn} onClick={clearClick}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
