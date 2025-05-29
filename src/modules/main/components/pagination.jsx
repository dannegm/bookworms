import { cn, getId } from '@/modules/core/helpers/utils';
import { sequence } from '@/modules/core/helpers/arrays';
import { clamp } from '@/modules/core/helpers/maths';

import {
    Pagination as ShadcnPagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/modules/shadcn/ui/pagination';

const getMiddlePages = (currentPage, lastPage, size = 5) => {
    const clampedSize = clamp(size, 1, lastPage);

    if (currentPage < clampedSize) {
        return sequence(clampedSize).map(index => {
            const pageNumber = index + 1;
            return {
                pageNumber,
                selected: pageNumber === currentPage,
            };
        });
    }

    if (currentPage > lastPage - clampedSize + 1) {
        return sequence(clampedSize).map(index => {
            const pageNumber = lastPage + index + 1 - clampedSize;
            return {
                pageNumber,
                selected: pageNumber === currentPage,
            };
        });
    }

    const middle = Math.floor(clampedSize / 2);

    return sequence(clampedSize).map(index => {
        const pageNumber = currentPage + index - middle;
        return {
            pageNumber,
            selected: pageNumber === currentPage,
        };
    });
};

export const Pagination = ({
    className,
    totalPages = 10,
    currentPage = 1,
    pagesShowed = 5,
    onChange,
    onNext,
    onPrev,
    onFirst,
    onLast,
}) => {
    const clampedCurrentPage = clamp(currentPage, 1, totalPages);

    const middlePages = getMiddlePages(clampedCurrentPage, totalPages, pagesShowed).map(page => ({
        ...page,
        key: getId(),
    }));

    const showFirstPage = totalPages > pagesShowed && clampedCurrentPage >= pagesShowed;
    const showLastPage =
        totalPages > pagesShowed && clampedCurrentPage <= totalPages - pagesShowed + 1;

    const isFirst = clampedCurrentPage <= 1;
    const isLast = clampedCurrentPage >= totalPages;

    const handleChange = (pageNumber, ev) => {
        ev.preventDefault();
        onChange(pageNumber);
    };

    const handleFirst = ev => {
        ev.preventDefault();
        onFirst(1);
        onChange(1);
    };
    const handleLast = ev => {
        ev.preventDefault();
        onLast(totalPages);
        onChange(totalPages);
    };
    const handlePrev = ev => {
        ev.preventDefault();
        const prevPage = Math.max(1, currentPage - 1);
        onPrev(prevPage);
        onChange(prevPage);
    };
    const handleNext = ev => {
        ev.preventDefault();
        const nextPage = Math.min(totalPages, currentPage + 1);
        onNext(nextPage);
        onChange(nextPage);
    };

    return (
        <ShadcnPagination className={cn(className)}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href='#' disabled={isFirst} onClick={handlePrev} />
                </PaginationItem>

                {showFirstPage && (
                    <>
                        <PaginationItem>
                            <PaginationLink href='#' onClick={handleFirst}>
                                1
                            </PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    </>
                )}

                {middlePages.map((page, index) => (
                    <PaginationItem key={page.key}>
                        <PaginationLink
                            href='#'
                            onClick={ev => handleChange(page.pageNumber, ev)}
                            isActive={page.selected}
                        >
                            {page.pageNumber}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {showLastPage && (
                    <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink href='#' onClick={handleLast}>
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                <PaginationItem>
                    <PaginationNext href='#' disabled={isLast} onClick={handleNext} />
                </PaginationItem>
            </PaginationContent>
        </ShadcnPagination>
    );
};
