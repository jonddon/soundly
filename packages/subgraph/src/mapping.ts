import { BigInt, log, Address } from "@graphprotocol/graph-ts"
import {
  Soundly,
  ArtistAdded,
  MusicAdded,
} from "../generated/Soundly/Soundly"
import { Artist, Music } from "../generated/schema"

// export let CATEGORY_SINGLE = BigInt.fromI32(1);
// export let CATEGORY_EP = BigInt.fromI32(2);
// export let CATEGORY_ALBUM = BigInt.fromI32(3);
// export const ZERO_ADDRESS = Address.fromHexString("0x0000000000000000000000000000000000000000");
export function handleArtistAdded(event: ArtistAdded): void {
  let artistString = event.params.artist.toHexString()

  let artist = Artist.load(artistString)

  if (artist == null) {
    artist = new Artist(artistString)
    artist.address = event.params.artist
    artist.name = event.params.artistName
    artist.verified = BigInt.fromI32(event.params.verified)
    artist.createdAt = event.block.timestamp
  }
  else {
    log.error('Artist {} already added', [artistString])
  }
  artist.save()

  // let soundlyContract = Soundly.bind(event.address);
  // const addr = Address.fromHexString("0xB08e92D4a03784735a93251A64e145B350228C22");
  // const name = "party"
  // let addArtistResp = soundlyContract.try_addArtist(addr, name)
  // if (!addArtistResp.reverted) {
  //   artist = new Artist(artistString)
  //   artist.address = event.params.artist
  //   artist.name = event.params.artistName
  //   artist.createdAt = event.block.timestamp

  //   artist.save()
  // }
}

export function handleMusicAdded(event: MusicAdded): void {

  let artistString = event.params.artist.toHexString()

  let artist = Artist.load(artistString)

  if (artist !== null) {
    let music = new Music(artistString);
    music.artist = artistString
    music.musicId = event.params.id
    music.category = event.params.category
    music.createdAt = event.block.timestamp
  }
  else {
    log.error('Artist {} not found', [artistString])
  }
  artist.save()

}
