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

const AllCollections = (props) => {
    let [collections, setCollections] = useState([]);
    let [page, setPage] = useState(1);
    let [searchText, setSearchText] = useState('');
    let [showCount, setShowCount] = useState(20);
    let [pageSize, setPageSize] = useState(20);
    let [isHidden, setHidden] = useState(false);
    let [isSale, setSale] = useState(false);
    let [isLettert, setLettert] = useState(false);
    let [isSortByCreateTime, setSortByCreateTime] = useState(false);
   
    useEffect(()=>{
        props.collectionAction.getCollectionList({
            hidden: isHidden,
            onsale: isSale,
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

    const onSelect = ({ key }) => {
        console.log(`${key} selected`);
        let counts
        switch(key) {
            case '1':
                counts = 20;
                break;
            case '2':
                counts = 40;
                break;
            case '3':
                counts = 60;
                break;
        }
        
        setPageSize(counts)
        props.collectionAction.getCollectionList({
            hidden: isHidden,
            onsale: isSale,
            page: page, 
            pageSize: counts,
        }, (data)=>{
            if(data) {
                setCollections(data);
            }
        })
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

    const handleSale = (e) => {
        setSale(e.target.checked);
        props.collectionAction.getCollectionList({
            hidden: isHidden,
            onsale: e.target.checked,
            page: page, 
            pageSize: pageSize,
        }, (data)=>{
            if(data) {
                setCollections(data);
            }
        })
    }

    const handleCollections = () => {
        if (searchText.length>0) {
            return collections.filter(collection => ((collection.name?.toUpperCase()?.includes(searchText.toUpperCase()))||(collection.creator_details?.name?.toUpperCase()?.includes(searchText.toUpperCase()))));
        } else {
            if (isLettert) {
                return collections.filter(collection => ((collection.name?.charAt(0)?.toLowerCase() === 't')));
            
            } 
            if (isSortByCreateTime) {
                return collections.sort(function (a, b) {
                    return new Date(b.created) - new Date(a.created);
                })
            }
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
                <div className="row col-lg-12 col-md-12 col-sm-12 mt-4 mb-4">
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <div className="form-check">
                            <input className="form-check-input d-flex align-items-center" type="checkbox" checked={isSale} onChange={(e)=>handleSale(e)}/>
                            <label className="body-sm ml-2 pt-1">
                            Show NFTs for sale
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <div className="form-check">
                            <input className="form-check-input d-flex align-items-center" type="checkbox" checked={isLettert} onChange={(e)=>setLettert(e.target.checked)}/>
                            <label className="body-sm ml-2 pt-1">
                            Show NFTs that starts with the letter "t" 
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <div className="form-check">
                            <input className="form-check-input d-flex align-items-center" type="checkbox" checked={isSortByCreateTime} onChange={(e)=>setSortByCreateTime(e.target.checked)}/>
                            <label className="body-sm ml-2 pt-1">
                            Sort NFTs by created time
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 row">
                        <label className="body-sm ml-2 pt-1 mr-2">
                        NFTs to get per API call
                        </label>
                        <Dropdown
                            trigger={['click']}
                            overlay={
                                <Menu onSelect={onSelect}>
                                    <MenuItem key="1">20</MenuItem>
                                    <MenuItem key="2">40</MenuItem>
                                    <MenuItem key="3">60</MenuItem>
                                </Menu>
                            }
                            animation="slide-up"
                        >
                            <div className='secondary-btn row'>
                                <div><i className="fas fa-list-ol mr-2"></i></div>
                                <div>{pageSize}</div>
                            </div>
                        </Dropdown>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllCollections);
