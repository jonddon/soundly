import React, {  useState } from 'react';
import Moralis from 'moralis';
import { useMoralis } from 'react-moralis';
import { initializeUser, startFlow, stopFlow } from '../../stream';


const AddMusics = () => {
    //  const fileRef = useRef();
    const [musicImage, setMusicImage] = useState(null);
    const [music, setMusic] = useState(null);
    const [title, setTitle] = useState("");
    const { user } = useMoralis();

    const Upload = async () => {
        if ((musicImage && music) != null) {
            console.log("data in upload", musicImage, music);
            // Save file input to IPFS
            const imageFile = musicImage;
            const musicFile = music;
            const image_file = new Moralis.File("music_art"+title, imageFile)
            const music_file = new Moralis.File("music_"+title
            , musicFile)
            await image_file.saveIPFS();
            await music_file.saveIPFS();

            console.log("image details", image_file.ipfs(), image_file.hash())
            console.log("music details", music_file.ipfs(), music_file.hash())

            // Save file reference to Moralis
            const musicDetails = new Moralis.Object('Music')
            musicDetails.set('name', user.get("name"))
            musicDetails.set('musicArt', image_file)
            musicDetails.set('musicUrl', music_file)
            musicDetails.set('musicTitle', title)
            musicDetails.set('artistAddress', user.get("ethAddress"))
            musicDetails.set('played', 0)
            await musicDetails.save()

            console.log("=====================")

            // Retrieve file
            const query = new Moralis.Query('Music')
            query.equalTo('name', 'John Odide Odey dd')
            query.find().then(function ([song]) {
            const ipfs = song.get('musicArt').ipfs()
                const hash = song.get('musicUrl').ipfs()
                const artistName_ = song.get('name');
                const artistAddress_ = song.get('artistAddress');

            console.log('musicArt url', ipfs)
                console.log('musicUrl url', hash)
                console.log('artist add', artistAddress_)
                console.log('artist', artistName_ )
            })
        }
        
    }

    const getMusic = async () => {
        
        const query = new Moralis.Query("Music");
        // query.limit(1);
        query.equalTo('name', 'John Odide Odey dd');
        
        const results = await query.find();
        alert("Successfully retrieved " + results.length + " scores.");
        console.log("these are the results", results);
        // Do something with the returned Moralis.Object values
        for (let i = 0; i < results.length; i++) {
            const object = results[i];
            
            console.log("details", await query.get(object.id))
            console.log(object);
        alert(object.id + ' - ' + object.get('name') );
        }
    }
    return (
        <div className={"add-page-wrapper"}>
            <div className={"music-wrapper"}>
                <label>Music Title</label>
                <input type="text" name="metadataTitle" id="metadataTitle" onChange={(e)=>setTitle(e.target.value) }/>
                <label htmlFor="music-art">Select Image</label>
                <input type="file" name="metadataImage" id="metadataImage" accept="images/*" onChange={(e)=>setMusicImage(e.target.files[0])}/>
                <label htmlFor="music">Music</label>
                <input accept="audio/*" type="file" name="metadataMusic" onChange={(e) => setMusic(e.target.files[0])} />
                <button onClick={Upload}> Upload</button>
            </div>
            <button onClick={getMusic}>Click me</button>
        </div>
    )
}

export default AddMusics
