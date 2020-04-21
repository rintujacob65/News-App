import React , {useState, useEffect}from 'react';

const App = () => {
  //state
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("react");
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react')
  const [loading, setLoading] = useState(false)
  //fetch news
  const fetchNews = () => {
    //set loading
    setLoading(true);
    fetch(url)
    .then(result => result.json())
    .then(data => (setNews(data.hits), setLoading(false)))
    .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchNews()
  }, [url])

 const handleChange = (e) => {
    setSearchQuery(e.target.value);
 };

 const handleSubmit = (e) => 
 {
    e.preventDefault()
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
 };
  
 const searchForm = () => (
    <form className="form-inline ml-4" onSubmit={handleSubmit}>
      <div className="form-group">
        <input className="form-control"
              type="text" 
              value={searchQuery} 
              onChange={handleChange}/>
      
      </div>
      <span className="form-group bmd-form-group ml-4">
        <button type="submit" className="btn btn-raised btn-primary">Search</button>
      </span>
    
  </form>
 )
 const showLoading = () => (loading ? <p>loading....</p> : "")
 const showNews = () => (news.map((n, i) => (
  <p className="list-group-item " key={i}>{n.title}</p> 
)))
  return(
    <div>
        <h2 className="text-center">News</h2>
        {showLoading() }
        {searchForm()}
        {showNews()}
    </div>
  );
};


export default App;
