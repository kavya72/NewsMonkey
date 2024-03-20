import React, { Component } from 'react'
import loading from '../loading.gif'

export default class Spinner extends Component {
    render() {
        return (
            <div className='text-center'>
                <img className="my-3" style={{ width: "50px", height: "auto" }} src={loading} alt="loading" />
            </div>
        )
    }
}
