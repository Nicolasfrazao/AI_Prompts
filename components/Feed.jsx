'use client'
import React,{useState, useEffect, useCallback} from "react";
import axios from "axios";
import { debounce } from "lodash";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => (
    <div className="mt-16 prompt_layout">
        {data.map((post) => (
            <PromptCard
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
            />
        ))}
    </div>
);

const Feed = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("/api/prompt");
            setAllPosts(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching posts:", error);
            // Handle the error (e.g. display an error message to the user)
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const filterPrompts = useCallback((searchtext) => {
        const regex = new RegExp(searchtext, "i");

        return allPosts.filter(
            (item) =>
                regex.test(item.creator.username) ||
                regex.test(item.tag) ||
                regex.test(item.prompt)
        );
    }, [allPosts]);

    const handleSearchChange = debounce((e) => {
        setSearchText(e.target.value);

        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
    }, 500);

    const handleTagClick = (tagName) => {
        setSearchText(tagName);

        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
    };

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search for a tag or a username'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </form>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {searchText ? (
                        <PromptCardList
                            data={searchedResults}
                            handleTagClick={handleTagClick}
                        />
                    ) : (
                        <PromptCardList
                            data={allPosts}
                            handleTagClick={handleTagClick}
                        />
                    )}
                </>
            )}
        </section>
    );
};

export default Feed;
