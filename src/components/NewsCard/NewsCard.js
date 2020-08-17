import React, {useEffect, useState, createRef} from 'react'
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography} from '@material-ui/core'
import useStyles from "./styles";
import classNames from "classnames";

const NewsCard = ({article: {description, publishedAt, source, title, url, urlToImage} , i, activeArticle }) => {
    const classes = useStyles()
    const [elRefs, setElRefs] = useState([]);
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50)

    useEffect(() => {
        setElRefs((refs) => Array(20).fill().map((_,j) => refs[j] || createRef()))
    }, [])

    useEffect(() => {
        if(i === activeArticle && elRefs[activeArticle]){
            scrollToRef(elRefs[activeArticle])
        }
    }, [i, activeArticle, elRefs])

    return (
        <Card ref={elRefs[i]} className={ classNames(classes.card, activeArticle === i ? classes.activeCard : null )}>
            <CardActionArea href={url} target="_blank">
                <CardMedia className= {classes.media} image={urlToImage || 'https://www.rdi-lb.tv/wp-content/uploads/2014/09/1281_1365455012.jpg'} />
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2" >{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h2" >{source.name}</Typography>
                </div>
                <Typography className={classes.title} variant="h5" component="h4" gutterBottom >{title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" >{description}</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" >Learn More</Button>
                    <Typography variant="h5" color="textSecondary">{i + 1}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}

export default NewsCard
