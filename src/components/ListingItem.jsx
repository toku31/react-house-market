import {Link} from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import {ReactComponent as EditIcon} from '../assets/svg/editIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'

function ListingItem( { listing, id, onDelete, onEdit }) {
  // const { listing, id, onDelete, onEdit } = props
  // console.log(listing.discountedPrice)
  return (
    <li className="categoryListing">
      <Link to={`/category/&{listing.type}/${id}`} className='categoryListingLink'>
        <img src={listing.imageUrls[0]} alt={listing.name} className='categoryListingImg' />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingName">{listing.name}</p>
          <p className="categoryListingPrice">￥{listing.offer
            ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {listing.type === 'rent' && '/ 月'}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="bed" />
            <p className="categoryListingInfoTExt">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} 寝室`
                : '1 寝室' }
            </p>
            <img src={bathtubIcon} alt="bath" />
            <p className="categoryListingInfoTExt">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} 浴室`
                : '1 浴室' }
            </p>
          </div>
        </div>
      </Link>

      {onDelete && (
        // <img src={bathtubIcon} alt="bath" />
        <DeleteIcon
          className='removeIcon'
          fill='rgb(231, 76,60)'
          onClick={() => onDelete(listing.id, listing.name)}
        />
      )}

      {onEdit && <EditIcon className='editIcon' onClick={() => onEdit(id)} /> }
    </li>
  )
}

export default ListingItem