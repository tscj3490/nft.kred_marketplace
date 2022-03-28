import React, { useState, useEffect } from 'react';
import ReactTooltip from "react-tooltip";
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';

import { connect } from 'react-redux';
import * as collectionAction from '../../actions/collection';
import { bindActionCreators } from 'redux';
// import { getCollections } from '../../store/collection';
import maticLogo from "../../assets/images/matic-logo.svg";

const FALLBACK_URL = "/img/no_image.png"

const HiddenCollections = (props) => {
    let [collections, setCollections] = useState([]);
    let [page, setPage] = useState(1);
    let [searchText, setSearchText] = useState('');
    let [showCount, setShowCount] = useState(20);
    let [pageSize, setPageSize] = useState(20);
    let [isHidden, setHidden] = useState(true);
   
    useEffect(()=>{
        props.collectionAction.getCollectionList({
            hidden: isHidden,
            onsale: false,
            page: page, 
            pageSize: pageSize,
        }, (data)=>{
            if(data) {
                setCollections(data);
            }
        })
    }, [])

    const onShowMore = ()=>{
        setShowCount(showCount + 20)
    }

    const getContractUrl = (chain, address, e) => {
        if(e) {
            e.stopPropagation();
            e.preventDefault();
          }
        var url
        switch(chain) {
            case "ethereum": 
                url = "https://etherscan.io/address/"+address;
                break;
            case "stellar": 
                url = "https://stellarchain.io/address/"+address;
                break;
        }
        window.open(url, "_blank");
    }


    const handleCollections = () => {
        if (searchText.length>0) {
            return collections.filter(collection => ((collection.name?.toUpperCase()?.includes(searchText.toUpperCase()))||(collection.creator_details?.name?.toUpperCase()?.includes(searchText.toUpperCase()))));
        } else {
            return collections;
        }
    }
    collections = handleCollections();
    return (
        <section className="popular-collections-area">
            <div className="container d-flex flex-column">
                <div className="row search-box d-flex justify-content-center">
                    <div className="search-form-lg mb-2">
                        <input className="form-control" placeholder="Search by nft or creator's name" value={searchText} onChange={(e)=>{setSearchText(e.target.value);handleCollections()}}></input>
                        <i className="fas fa-search search-icon" onClick={()=>handleCollections()}/>
                    </div>
                </div>
                <div className="row items">
                {collections?.slice(0, showCount)?.map((item, idx) =>
                    <div key={`edt_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                        <div className="card">
                            <div className="image-over">
                                <img src={item.back || FALLBACK_URL} onError={(e) => { e.onerror = null; e.target.src=FALLBACK_URL}} className="card-img-top" alt=""/>
                                <a className="seller" href='#'>
                                    <div className="seller-thumb avatar-lg">
                                        <img className="rounded-circle" src={item?.creator_details?.avatar} alt="" />
                                    </div>
                                </a>
                            </div>
                            <div className="col-12 p-0">
                                <div className="card-body">
                                    <div className="seller text-center my-3">
                                        <span>{item?.creator_details?.name}</span>
                                    </div>
                                    <div className='d-flex flex-row justify-content-between align-items-center'>
                                        <div className="clamp2">{item.name}</div>
                                        <div className="card-bottom">
                                            <img src={maticLogo} className='chain-logo mr-2'  data-tip data-for={`chain-info_${idx}`}></img>
                                            <ReactTooltip id={`chain-info_${idx}`} type="dark" effect="solid" place="top" className="tooltip">
                                                <div>{item.blockchain}</div>
                                            </ReactTooltip>
                                        </div>
                                    </div>
                                    <a href='#' onClick={(e)=>getContractUrl(item.blockchain, item.wallet_address, e)} className='chain-view'>
                                        View on Blockchain Explorer
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                </div>
                {collections?.length>showCount&&<div className="col-md-12 mt-4 text-center">
                <button className='btn secondary-btn heading-xxxs mt-4' onClick={onShowMore}>load more</button>
                </div>}
            </div>
        </section>
    );
}

const mapStateToProps = ({collection})=>({collection})
const mapDispatchToProps = (dispatch) => ({
    collectionAction: bindActionCreators({...collectionAction}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HiddenCollections);
